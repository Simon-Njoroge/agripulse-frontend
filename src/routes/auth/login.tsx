import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import {  useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { ForceLoginModal } from '@/common/ForceLoginModal';
import { Mail, Lock, Eye, EyeOff, Leaf, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})



type ForceLoginData = {
  requireForceLogin: true;
  user: {
    email: string;
    name: string;
  };
};

function isForceLoginData(loginData: unknown): loginData is ForceLoginData {
  if (typeof loginData !== 'object' || loginData === null) {
    return false;
  }

  const data = loginData as {
    requireForceLogin?: unknown;
    user?: { email?: unknown; name?: unknown };
  };

  return (
    data.requireForceLogin === true &&
    typeof data.user?.email === 'string' &&
    typeof data.user?.name === 'string'
  );
}


function LoginPage() {
  const navigate = useNavigate();
  const { login, forceLogin, isLoggingIn, isForceLoggingIn, loginData } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  
  const [showForceModal, setShowForceModal] = useState(false);
  const [pendingCredentials, setPendingCredentials] = useState<{ email: string; password: string } | null>(null);

  
  useEffect(() => {
    if (isForceLoginData(loginData)) {
      setPendingCredentials({ email, password });
      setShowForceModal(true);
    }
  }, [loginData, email, password]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'admin') {
        navigate({ to: '/admin' });
      } else {
        navigate({ to: '/agent' });
      }
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      login({ email, password });
    }
  };

  const handleForceLoginConfirm = () => {
    if (pendingCredentials) {
      forceLogin({ email: pendingCredentials.email, password: pendingCredentials.password });
      setShowForceModal(false);
      setPendingCredentials(null);
    }
  };

  const handleForceLoginCancel = () => {
    setShowForceModal(false);
    setPendingCredentials(null);
    toast('You can try again later or contact support');
  };

  
  const forceLoginUser = isForceLoginData(loginData)
    ? loginData.user
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex">
     
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-green-700 to-green-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop"
          alt="Agricultural field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8" />
            <span className="text-2xl font-bold">AgriPulse</span>
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">Welcome Back to Smart Farming</h1>
            <p className="text-green-100 mb-8">Monitor crops, track risks, and optimize harvests from anywhere.</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span>Real-time field monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span>Smart risk detection alerts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span>Agent performance tracking</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-green-600/30">
              <p className="text-sm text-green-200">Trusted by 500+ farms across Kenya</p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">AgriPulse</span>
            </div>
          </div>

        
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-500 mt-2">Welcome back! Please enter your details</p>
          </div>

         
          <form onSubmit={handleSubmit} className="space-y-5">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="admin@agripulse.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </p>
              )}
            </div>

            
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 transition">
                Forgot password?
              </a>
            </div>

    
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

       

          
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-green-600 font-semibold hover:text-green-700 transition">
              Create an account
            </a>
          </p>
        </div>
      </div>

      
      {forceLoginUser && (
        <ForceLoginModal
          isOpen={showForceModal}
          userEmail={forceLoginUser.email}
          userName={forceLoginUser.name}
          onConfirm={handleForceLoginConfirm}
          onCancel={handleForceLoginCancel}
          isLoading={isForceLoggingIn}
        />
      )}
    </div>
  );
}

