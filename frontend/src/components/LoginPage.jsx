import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { Eye, EyeOff, Lock } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      
      if (response.data.access_token) {
        // Salva token no localStorage
        localStorage.setItem('admin_token', response.data.access_token);
        
        toast.success('Login realizado com sucesso!');
        
        // Redireciona para dashboard
        setTimeout(() => {
          navigate('/admin');
        }, 500);
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        toast.error('Usuário ou senha incorretos');
      } else {
        toast.error('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_maquina-crescimento/artifacts/a54bf2we_image.png" 
            alt="MSD Logo" 
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Dashboard Admin - MSD</h1>
          <p className="text-neutral-400 mt-2">Faça login para acessar</p>
        </div>

        {/* Login Card */}
        <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-full mx-auto mb-4">
              <Lock className="w-6 h-6 text-amber-500" />
            </div>
            <CardTitle className="text-center text-white">Acesso Restrito</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais de administrador
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-neutral-300">Usuário</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  placeholder="admin"
                  className="mt-1 bg-neutral-800 border-neutral-700 text-white"
                  autoComplete="username"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-neutral-300">Senha</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="bg-neutral-800 border-neutral-700 text-white pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {/* Credenciais padrão (remover em produção) */}
            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-400 text-center">
                <strong>Credenciais padrão:</strong><br />
                Usuário: admin<br />
                Senha: msd2025
              </p>
              <p className="text-xs text-blue-300 text-center mt-2">
                ⚠️ Altere no arquivo backend/.env
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Voltar para landing page */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-neutral-400 hover:text-white text-sm transition-colors"
          >
            ← Voltar para Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
