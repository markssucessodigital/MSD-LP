#!/usr/bin/env python3
"""
MSD Landing Page - Backend API Test Suite
Testa todas as APIs de captura de leads e funcionalidades do backend
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class MSDAPITester:
    def __init__(self, base_url="https://maquina-crescimento.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: Dict[str, Any]):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {name}")
        if not success:
            print(f"   Error: {details.get('error', 'Unknown error')}")
        
        return success

    def run_api_test(self, name: str, method: str, endpoint: str, expected_status: int, 
                     data: Dict = None, headers: Dict = None) -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        test_headers = {'Content-Type': 'application/json'}
        if headers:
            test_headers.update(headers)

        try:
            print(f"\n🔍 Testing {name}...")
            print(f"   URL: {url}")
            
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=test_headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            details = {
                "method": method,
                "url": url,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "response_time": response.elapsed.total_seconds()
            }

            if success:
                try:
                    details["response_data"] = response.json()
                except:
                    details["response_data"] = response.text[:200]
            else:
                details["error"] = f"Status {response.status_code} != {expected_status}"
                try:
                    details["error_response"] = response.json()
                except:
                    details["error_response"] = response.text[:200]

            return self.log_test(name, success, details), response

        except Exception as e:
            details = {
                "method": method,
                "url": url,
                "expected_status": expected_status,
                "error": str(e)
            }
            return self.log_test(name, False, details), None

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n" + "="*50)
        print("TESTING HEALTH ENDPOINTS")
        print("="*50)
        
        # Test root endpoint
        self.run_api_test(
            "API Root Endpoint",
            "GET",
            "api/",
            200
        )
        
        # Test health check
        self.run_api_test(
            "Health Check Endpoint",
            "GET", 
            "api/health",
            200
        )

    def test_leads_api(self):
        """Test all leads API endpoints"""
        print("\n" + "="*50)
        print("TESTING LEADS API")
        print("="*50)
        
        # Test create lead
        test_lead = {
            "name": f"Teste Lead {datetime.now().strftime('%H%M%S')}",
            "email": f"teste{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "11999999999",
            "message": "Mensagem de teste do backend",
            "source": "backend_test",
            "utm_source": "test",
            "utm_medium": "automated",
            "utm_campaign": "backend_testing"
        }
        
        success, response = self.run_api_test(
            "Create Lead",
            "POST",
            "api/leads",
            200,
            data=test_lead
        )
        
        lead_id = None
        if success and response:
            try:
                response_data = response.json()
                lead_id = response_data.get('lead_id')
                print(f"   Created lead ID: {lead_id}")
            except:
                pass

        # Test get all leads
        self.run_api_test(
            "Get All Leads",
            "GET",
            "api/leads",
            200
        )
        
        # Test get leads with status filter
        self.run_api_test(
            "Get Leads - Filter by Status",
            "GET",
            "api/leads?status=new",
            200
        )
        
        # Test get leads with pagination
        self.run_api_test(
            "Get Leads - Pagination",
            "GET",
            "api/leads?limit=5&skip=0",
            200
        )
        
        # Test get leads stats
        self.run_api_test(
            "Get Leads Stats",
            "GET",
            "api/leads/stats", 
            200
        )
        
        # Test export leads
        success, response = self.run_api_test(
            "Export Leads CSV",
            "GET",
            "api/leads/export",
            200
        )
        
        if success and response:
            content_type = response.headers.get('content-type', '')
            if 'csv' not in content_type.lower():
                print(f"   Warning: Expected CSV content type, got: {content_type}")
        
        # Test update lead status (if we have a lead_id)
        if lead_id:
            success, response = self.run_api_test(
                "Update Lead Status",
                "PATCH",
                f"api/leads/{lead_id}/status?status=contacted",
                200
            )

    def test_error_handling(self):
        """Test error handling scenarios"""
        print("\n" + "="*50)
        print("TESTING ERROR HANDLING")
        print("="*50)
        
        # Test create lead with invalid data
        invalid_lead = {
            "name": "",  # Invalid: empty name
            "email": "invalid-email",  # Invalid: bad email format
            "phone": "123"  # Invalid: too short
        }
        
        self.run_api_test(
            "Create Lead - Invalid Data",
            "POST",
            "api/leads",
            422,  # Validation error
            data=invalid_lead
        )
        
        # Test update non-existent lead
        self.run_api_test(
            "Update Non-existent Lead",
            "PATCH",
            "api/leads/fake-id/status?status=contacted",
            404
        )
        
        # Test invalid status update
        self.run_api_test(
            "Update Lead - Invalid Status",
            "PATCH", 
            "api/leads/some-id/status?status=invalid_status",
            400
        )

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed / self.tests_run * 100):.1f}%")
        
        if self.tests_passed < self.tests_run:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test_name']}: {result['details'].get('error', 'Unknown')}")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test function"""
    print("🚀 Starting MSD Landing Page Backend API Tests")
    print("=" * 60)
    
    tester = MSDAPITester()
    
    try:
        # Run all test suites
        tester.test_health_endpoints()
        tester.test_leads_api()
        tester.test_error_handling()
        
        # Print final summary
        all_passed = tester.print_summary()
        
        # Save results to JSON
        with open('/app/test_reports/backend_test_results.json', 'w') as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "summary": {
                    "total_tests": tester.tests_run,
                    "passed": tester.tests_passed,
                    "failed": tester.tests_run - tester.tests_passed,
                    "success_rate": (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
                },
                "results": tester.test_results
            }, f, indent=2)
        
        return 0 if all_passed else 1
        
    except Exception as e:
        print(f"\n❌ Critical Error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())