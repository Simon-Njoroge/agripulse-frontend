import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFieldSchema } from '@/utils/schemas';
import { CropType, FieldStage } from '@/types/auth.types';
import { cropTypeLabels } from '@/utils/helpers';

interface FieldFormProps {
  defaultValues?: any;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  title?: string;
  submitText?: string;
}

export function FieldForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  title = 'Create Field',
  submitText = 'Create',
}: FieldFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFieldSchema),
    defaultValues: defaultValues || {},
  });

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Field Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field Name *
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Enter field name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message?.toString()}</p>
          )}
        </div>

        {/* Crop Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Crop Type *
          </label>
          <select
            {...register('cropType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select crop type</option>
            {Object.entries(cropTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {errors.cropType && (
            <p className="text-red-600 text-xs mt-1">{errors.cropType.message?.toString()}</p>
          )}
        </div>

        {/* Planting Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Planting Date *
          </label>
          <input
            {...register('plantingDate')}
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.plantingDate && (
            <p className="text-red-600 text-xs mt-1">{errors.plantingDate.message?.toString()}</p>
          )}
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area (Hectares)
          </label>
          <input
            {...register('areaInHectares')}
            type="number"
            step="0.01"
            placeholder="Enter area in hectares"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.areaInHectares && (
            <p className="text-red-600 text-xs mt-1">{errors.areaInHectares.message?.toString()}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            {...register('location')}
            type="text"
            placeholder="Enter field location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.location && (
            <p className="text-red-600 text-xs mt-1">{errors.location.message?.toString()}</p>
          )}
        </div>

        {/* Estimated Harvest Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Harvest Date
          </label>
          <input
            {...register('estimatedHarvestDate')}
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.estimatedHarvestDate && (
            <p className="text-red-600 text-xs mt-1">
              {errors.estimatedHarvestDate.message?.toString()}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-medium"
          >
            {isLoading ? 'Processing...' : submitText}
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
