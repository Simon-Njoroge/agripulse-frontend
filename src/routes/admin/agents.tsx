import { createFileRoute } from '@tanstack/react-router';
import { useAgents } from '@/hooks/useAgents';
import { Mail, Phone, MapPin, Loader } from 'lucide-react';

export const Route = createFileRoute('/admin/agents')({
  component: AdminAgents,
});

function AdminAgents() {
  const { data: agents, isLoading } = useAgents();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  const agentList = agents || [];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agents Management</h1>
          <p className="text-gray-600 mt-2">Manage field agents and their assignments</p>
        </div>

        {/* Agents Grid */}
        {agentList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentList.map((agent) => (
              <div
                key={agent.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-green-700">
                      {agent.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">Field Agent</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>Contact information</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Active in field</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-lg border border-gray-100">
            <p className="text-gray-600">No agents found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
