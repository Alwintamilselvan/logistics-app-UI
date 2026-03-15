import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-gray-600">Logistics Management Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="admin@logistics.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/driver/login')}
            className="text-[#2563eb] hover:underline"
          >
            Driver Login
          </button>
        </div>
      </div>
    </div>
  );
}
