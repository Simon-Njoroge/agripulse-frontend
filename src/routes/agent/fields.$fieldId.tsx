import { createFileRoute, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFieldUpdatesForField } from '@/hooks/useFieldUpdates';
import { fieldService } from '@/api/field.service';
import { fieldUpdateService } from '@/api/field-update.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateFieldStageSchema, addFieldNoteSchema } from '@/utils/schemas';
import {
  formatDate,
  fieldStatusLabels,
  fieldStatusColors,
  fieldStageLabels,
  cropTypeLabels,
} from '@/utils/helpers';
import { ArrowLeft, Send, MessageSquare, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import type { FieldStage } from '@/types/auth.types';

export const Route = createFileRoute('/agent/fields/$fieldId')({
  component: FieldDetail,
});

function FieldDetail() {
  const { fieldId } = useParams({ from: '/agent/fields/$fieldId' });
  const [activeTab, setActiveTab] = useState<'details' | 'updates' | 'notes'>('details');
  const queryClient = useQueryClient();

  const { data: updates } = useFieldUpdatesForField(fieldId);
  const [field] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  
  useState(() => {
    const loadField = async () => {
      try {
        
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load field');
        setLoading(false);
      }
    };
    loadField();
  }, [fieldId]);

  
  const {
    register: registerStage,
    handleSubmit: handleSubmitStage,
    formState: { errors: stageErrors },
  } = useForm({
    resolver: zodResolver(updateFieldStageSchema),
  });

  const updateStageMutation = useMutation({
    mutationFn: async (data: any) => {
      return fieldService.updateFieldStage(fieldId, data.newStage, data.notes);
    },
    onSuccess: () => {
      toast.success('Field stage updated successfully');
      queryClient.invalidateQueries({ queryKey: ['field-updates', 'field', fieldId] });
    },
    onError: () => {
      toast.error('Failed to update field stage');
    },
  });

  
  const {
    register: registerNote,
    handleSubmit: handleSubmitNote,
    reset: resetNote,
    formState: { errors: noteErrors },
  } = useForm({
    resolver: zodResolver(addFieldNoteSchema),
  });

  const addNoteMutation = useMutation({
    mutationFn: async (data: any) => {
      return fieldUpdateService.addNote(fieldId, data.notes);
    },
    onSuccess: () => {
      toast.success('Note added successfully');
      resetNote();
      queryClient.invalidateQueries({ queryKey: ['field-updates', 'field', fieldId] });
    },
    onError: () => {
      toast.error('Failed to add note');
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  if (!field) {
    return (
      <div className="p-8">
        <p className="text-red-600">Field not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{field?.name}</h1>
            <p className="text-gray-600 mt-2">
              Crop: {cropTypeLabels[field?.cropType as keyof typeof cropTypeLabels]}
            </p>
          </div>
          <span className={`ml-auto px-4 py-2 rounded-full font-medium ${fieldStatusColors[field?.computedStatus]}`}>
            {fieldStatusLabels[field?.computedStatus]}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-white p-4 rounded-lg border border-gray-100">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'details'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Field Details
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'updates'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Updates History
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'notes'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Notes
          </button>
        </div>

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Field Information */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Planting Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(field?.plantingDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Harvest</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {field?.estimatedHarvestDate
                      ? formatDate(field.estimatedHarvestDate)
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Area (Hectares)</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {field?.areaInHectares || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {field?.location || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Update Stage */}
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Stage</h3>
              <form onSubmit={handleSubmitStage((data) => updateStageMutation.mutate(data))}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stage: {fieldStageLabels[field?.currentStage as FieldStage]}
                  </label>
                  <select
                    {...registerStage('newStage')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select new stage</option>
                    <option value="GROWING">Growing</option>
                    <option value="READY">Ready for Harvest</option>
                    <option value="HARVESTED">Harvested</option>
                  </select>
                  {stageErrors.newStage && (
                    <p className="text-red-600 text-xs mt-1">
                      {stageErrors.newStage.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    {...registerStage('notes')}
                    rows={3}
                    placeholder="Add notes about this update..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updateStageMutation.isPending}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {updateStageMutation.isPending ? 'Updating...' : 'Update Stage'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Updates Tab */}
        {activeTab === 'updates' && (
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update History</h3>
            {updates && updates.data && updates.data.length > 0 ? (
              <div className="space-y-4">
                {updates.data.map((update) => (
                  <div key={update.id} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Updated to {fieldStageLabels[update.newStage]}
                        </p>
                        {update.previousStage && (
                          <p className="text-sm text-gray-600 mt-1">
                            Previous: {fieldStageLabels[update.previousStage]}
                          </p>
                        )}
                        {update.notes && (
                          <p className="text-sm text-gray-600 mt-2">
                            📝 {update.notes}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(update.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No updates yet</p>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Add Note Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Add Note
              </h3>
              <form onSubmit={handleSubmitNote((data) => addNoteMutation.mutate(data))}>
                <textarea
                  {...registerNote('notes')}
                  rows={4}
                  placeholder="Write your note here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
                />
                {noteErrors.notes && (
                  <p className="text-red-600 text-xs mb-2">
                    {noteErrors.notes.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={addNoteMutation.isPending}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {addNoteMutation.isPending ? 'Posting...' : 'Post Note'}
                </button>
              </form>
            </div>

            {/* Notes List */}
            {updates && updates.data && (
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                {updates.data.filter((u) => u.updateType === 'note').length > 0 ? (
                  <div className="space-y-3">
                    {updates.data
                      .filter((u) => u.updateType === 'note')
                      .map((note) => (
                        <div key={note.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-sm text-gray-600 mb-2">
                            By {note.agentName} • {formatDate(note.createdAt)}
                          </p>
                          <p className="text-gray-900">{note.notes}</p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No notes yet</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
