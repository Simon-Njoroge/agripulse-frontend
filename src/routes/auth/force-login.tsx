import { useLocation, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ForceLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { forceLogin, isForceLoggingIn } = useAuth();

  // Get state passed from login page
  const state = location.state as {
    email: string;
    password: string;
    userEmail: string;
    userName: string;
  };

  const [error, setError] = useState<string | null>(null);

  const handleForceLogin = () => {
    forceLogin({ email: state.email, password: state.password });
  };

  if (!state) {
    // If no state, redirect to login
    navigate({ to: '/auth/login' });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2">
            <span role="img" aria-label="warning">⚠️</span>
          </span>
          Active Session Detected
        </h2>
        <p className="text-gray-600 mb-4">
          You already have an active session on another device.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-500">Account</p>
          <p className="font-medium text-gray-800">{state.userEmail}</p>
          <p className="text-sm text-gray-500 mt-2">Name</p>
          <p className="font-medium text-gray-800">{state.userName}</p>
        </div>
        <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-4">
          If you continue, you will be logged out from all other devices.
        </p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => navigate({ to: '/auth/login' })}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            disabled={isForceLoggingIn}
          >
            Cancel
          </button>
          <button
            onClick={handleForceLogin}
            disabled={isForceLoggingIn}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isForceLoggingIn ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Continue & Terminate Other Session'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
