import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { LayoutDashboard, Leaf, LogOut, Users, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { logout: logoutAuth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAuth();
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:relative lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">AgriPulse</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive('/admin/dashboard')
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <Link
                to="/admin/fields"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive('/admin/fields')
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                Fields Management
              </Link>
              <Link
                to="/admin/agents"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive('/admin/agents')
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                Agents
              </Link>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
