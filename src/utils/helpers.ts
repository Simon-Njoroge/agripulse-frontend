import { CropType, FieldStage, FieldStatus } from '@/types/auth.types';

export const cropTypeLabels: Record<CropType, string> = {
  CORN: 'Corn',
  WHEAT: 'Wheat',
  SOYBEANS: 'Soybeans',
  RICE: 'Rice',
  COTTON: 'Cotton',
  BARLEY: 'Barley',
};

export const fieldStageLabels: Record<FieldStage, string> = {
  PLANTED: 'Planted',
  GROWING: 'Growing',
  READY: 'Ready for Harvest',
  HARVESTED: 'Harvested',
};

export const fieldStatusLabels: Record<FieldStatus, string> = {
  ACTIVE: 'Active',
  AT_RISK: 'At Risk',
  COMPLETED: 'Completed',
};

export const fieldStatusColors: Record<FieldStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  AT_RISK: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
};

export const fieldStatusBadgeColors: Record<FieldStatus, string> = {
  ACTIVE: 'bg-green-500',
  AT_RISK: 'bg-red-500',
  COMPLETED: 'bg-gray-500',
};

export const fieldStageColors: Record<FieldStage, string> = {
  PLANTED: 'bg-blue-100 text-blue-800',
  GROWING: 'bg-green-100 text-green-800',
  READY: 'bg-yellow-100 text-yellow-800',
  HARVESTED: 'bg-gray-100 text-gray-800',
};

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDaysAgo(date: string | Date): number {
  const now = new Date();
  const then = new Date(date);
  const diffTime = Math.abs(now.getTime() - then.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
