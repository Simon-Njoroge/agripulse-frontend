import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useMyFields } from '@/hooks/useFields';
import { useNavigate } from '@tanstack/react-router';
import {
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Loader,
} from 'lucide-react';
import {
  formatDate,
  fieldStatusLabels,
  fieldStatusColors,
  fieldStageLabels,
  cropTypeLabels,
} from '@/utils/helpers';
import type { FieldStatus } from '@/types/auth.types';

export const Route = createFileRoute('/agent/fields')({
  component: AgentFields,
});

function AgentFields() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<FieldStatus | ''>('');

  const { data, isLoading } = useMyFields({
    page,
    limit: 20,
    status: (statusFilter || undefined) as FieldStatus | undefined,
  });

  const handleViewField = (fieldId: string) => {
    navigate({ to: `/agent/fields/${fieldId}` });
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Fields</h1>
          <p className="text-gray-600 mt-2">Monitor and update your assigned fields</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
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
                  Total Fields: <span className="text-lg font-bold text-green-600">{pagination?.total || 0}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fields Grid */}
        {fields.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {fields.map((field) => (
                <div
                  key={field.id}
                  onClick={() => handleViewField(field.id)}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition cursor-pointer"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{field.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${fieldStatusColors[field.computedStatus]}`}>
                      {fieldStatusLabels[field.computedStatus]}
                    </span>
                  </div>

                  {/* Crop Type */}
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Crop:</span> {cropTypeLabels[field.cropType] || field.cropType}
                  </p>

                  {/* Location */}
                  {field.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{field.location}</span>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Planted: {formatDate(field.plantingDate)}</span>
                    </div>
                    {field.estimatedHarvestDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Harvest: {formatDate(field.estimatedHarvestDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Current Stage */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-1">Current Stage</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {fieldStageLabels[field.currentStage] || field.currentStage}
                    </p>
                  </div>

                  {/* At Risk Alert */}
                  {field.computedStatus === 'AT_RISK' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700">
                        This field needs immediate attention. Please review and update.
                      </p>
                    </div>
                  )}

                  {/* Last Update */}
                  {field.lastUpdateAt && (
                    <p className="text-xs text-gray-500 mt-4">
                      Last updated: {formatDate(field.lastUpdateAt)}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
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
          <div className="p-8 text-center bg-white rounded-lg border border-gray-100">
            <p className="text-gray-600">No fields assigned yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
