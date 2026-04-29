import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useRef } from 'react';
import { authService } from '../api/auth.service';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest, ForceLoginRequiredResponse } from '../types/auth.types';
import toast from 'react-hot-toast';

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser, setAuthenticated, clearAuth, user, isAuthenticated } = useAuthStore();
  const currentCredentialsRef = useRef<LoginRequest | null>(null);


  const useGetMe = () =>
    useQuery({
      queryKey: ['me'],
      queryFn: async () => {
        const response = await authService.getMe();
        if (response.success && response.data) {
          setUser(response.data);
          setAuthenticated(true);
          return response.data;
        }
        return null;
      },
      retry: false,
      enabled: !!localStorage.getItem('access_token'),
    });

  
  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      currentCredentialsRef.current = data;
      // Always include forceLogin: true in the payload
      const response = await authService.login({ ...data, forceLogin: true });
      return response; // This is the actual API response (requireForceLogin or login data)
    },
    onSuccess: (response) => {
      if ('requireForceLogin' in response && response.requireForceLogin === true) {
        // Do not navigate, let modal logic handle
        toast.info('Existing session detected. Please confirm force login.');
        return;
      }
      if ('access_token' in response) {
        setUser(response.user);
        setAuthenticated(true);
        toast.success(`Welcome back, ${response.user.name}!`);
        if (response.user.role === 'admin') {
          navigate({ to: '/admin' });
        } else {
          navigate({ to: '/agent' });
        }
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    },
  });

 
  const forceLoginMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authService.forceLogin({ ...data, forceLogin: true });
      return response;
    },
    onSuccess: (response) => {
      if ('access_token' in response) {
        setUser(response.user);
        setAuthenticated(true);
        toast.success(`Logged in successfully on this device. Previous session was terminated.`);

        if (response.user.role === 'admin') {
          navigate({ to: '/admin' });
        } else {
          navigate({ to: '/agent' });
        }
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Force login failed');
    },
  });

 
  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (response) => {
      toast.success(response.message || 'Account created successfully! Please login.');
      navigate({ to: '/login' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Signup failed');
    },
  });

 
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return authService.logout({});
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
      navigate({ to: '/login' });
    },
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    loginData: loginMutation.data,
    
    forceLogin: forceLoginMutation.mutate,
    isForceLoggingIn: forceLoginMutation.isPending,
    
    signup: signupMutation.mutate,
    isSigningUp: signupMutation.isPending,
    
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    
    useGetMe,
  };
}