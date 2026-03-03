import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const leadsAPI = {
  // Create a new lead
  createLead: async (leadData) => {
    try {
      const response = await axios.post(`${API_URL}/api/leads`, leadData);
      return response.data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  // Get all leads (admin)
  getLeads: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}/api/leads?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  // Get leads stats
  getStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/leads/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Export leads to CSV
  exportLeads: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/leads/export`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_msd_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return true;
    } catch (error) {
      console.error('Error exporting leads:', error);
      throw error;
    }
  },

  // Update lead status
  updateStatus: async (leadId, status) => {
    try {
      const response = await axios.patch(`${API_URL}/api/leads/${leadId}/status`, null, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
};
