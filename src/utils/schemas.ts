import { z } from 'zod';

export const createFieldSchema = z.object({
  name: z.string().min(1, 'Field name is required'),
  cropType: z.string().min(1, 'Crop type is required'),
  plantingDate: z.string().min(1, 'Planting date is required'),
  areaInHectares: z.number().optional(),
  location: z.string().optional(),
  estimatedHarvestDate: z.string().optional(),
  assignedAgentId: z.string().optional(),
});

export const updateFieldStageSchema = z.object({
  newStage: z.string().min(1, 'Stage is required'),
  notes: z.string().optional(),
});

export const addFieldNoteSchema = z.object({
  notes: z.string().min(1, 'Note cannot be empty'),
});

export const assignFieldSchema = z.object({
  agentId: z.string().min(1, 'Please select an agent'),
});

export type CreateFieldInput = z.infer<typeof createFieldSchema>;
export type UpdateFieldStageInput = z.infer<typeof updateFieldStageSchema>;
export type AddFieldNoteInput = z.infer<typeof addFieldNoteSchema>;
export type AssignFieldInput = z.infer<typeof assignFieldSchema>;
