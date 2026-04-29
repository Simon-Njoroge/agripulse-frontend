import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAdminFields } from '@/hooks/useFields';
import { useAgents } from '@/hooks/useAgents';
import { useNavigate } from '@tanstack/react-router';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader,
} from 'lucide-react';
import { formatDate, fieldStatusLabels, fieldStatusColors, cropTypeLabels } from '@/utils/helpers';
import type { FieldStatus } from '@/types/auth.types';

export const Route = createFileRoute('/admin/fields')({
  component: AdminFields,
});

function AdminFields() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FieldStatus | ''>('');

  const { data, isLoading } = useAdminFields({
    page,
    limit: 20,
    search: search || undefined,
    status: (statusFilter || undefined) as FieldStatus | undefined,
  });

  const handleCreateField = () => {
    navigate({ to: '/admin/fields/create' });
  };

  const handleEditField = (fieldId: string) => {
    navigate({ to: `/admin/fields/${fieldId}/edit` });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  const fields = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fields Management</h1>
            <p className="text-gray-600 mt-2">Manage all agricultural fields</p>
          </div>
          <button
            onClick={handleCreateField}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5" />
            Create Field
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Fields
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as FieldStatus | '');
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="AT_RISK">At Risk</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {/* Results */}
            <div className="flex items-end">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Total Results: <span className="text-lg font-bold text-green-600">{pagination?.total || 0}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fields Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {fields.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Field Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Crop Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Assigned Agent
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Last Update
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field) => (
                      <tr key={field.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {field.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {cropTypeLabels[field.cropType] || field.cropType}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {field.assignedAgent?.name || 'Unassigned'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${fieldStatusColors[field.computedStatus]}`}>
                            {fieldStatusLabels[field.computedStatus]}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {field.lastUpdateAt ? formatDate(field.lastUpdateAt) : 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditField(field.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete field "${field.name}"?`)) {
                                  // Handle delete
                                }
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.totalPages}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                      disabled={page === pagination.totalPages}
                      className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600">No fields found. Create one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
