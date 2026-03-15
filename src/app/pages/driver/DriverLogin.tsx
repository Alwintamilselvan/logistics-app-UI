import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { MobileViewport } from '../../components/MobileViewport';

export function DriverLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/driver/dashboard');
  };

  return (
    <MobileViewport>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5 py-8">
        <div className="w-full">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-[#2563eb] rounded-2xl flex items-center justify-center mb-5 shadow-lg">
              <Package className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-gray-900 mb-2 text-center">LogiTrack Driver</h1>
            <p className="text-gray-600 text-center">Sign in to start deliveries</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="driver@logistics.com"
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
              onClick={() => navigate('/admin/login')}
              className="text-[#2563eb] hover:underline text-base"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </MobileViewport>
  );
}