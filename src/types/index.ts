// Enums
export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
}

export enum CropType {
  CORN = 'CORN',
  WHEAT = 'WHEAT',
  SOYBEANS = 'SOYBEANS',
  RICE = 'RICE',
  COTTON = 'COTTON',
  BARLEY = 'BARLEY',
}

export enum FieldStage {
  PLANTED = 'PLANTED',
  GROWING = 'GROWING',
  READY = 'READY',
  HARVESTED = 'HARVESTED',
}

export enum FieldStatus {
  ACTIVE = 'ACTIVE',
  AT_RISK = 'AT_RISK',
  COMPLETED = 'COMPLETED',
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

// Field
export interface Field {
  id: string;
  name: string;
  cropType: CropType;
  plantingDate: string;
  currentStage: FieldStage;
  computedStatus: FieldStatus;
  areaInHectares?: number;
  location?: string;
  estimatedHarvestDate?: string;
  assignedAgentId: string;
  assignedAgent?: {
    id: string;
    name: string;
    email: string;
  };
  lastUpdateAt?: string;
  notes?: string;
  createdAt: string;
}

// Field Update
export interface FieldUpdate {
  id: string;
  fieldId: string;
  fieldName?: string;
  agentId: string;
  agentName?: string;
  newStage: FieldStage;
  previousStage?: FieldStage;
  notes?: string;
  updateType: 'stage_change' | 'note';
  createdAt: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Admin
export interface AdminDashboard {
  totalFields: number;
  activeFields: number;
  atRiskFields: number;
  completedFields: number;
  cropDistribution: Record<string, number>;
  stageDistribution: Record<string, number>;
  agentPerformance: Array<{
    agentId: string;
    agentName: string;
    fieldsAssigned: number;
    updatesThisWeek: number;
    completionRate: number;
    performanceScore: number;
  }>;
  recentActivity: Array<{
    id: string;
    fieldName: string;
    agentName: string;
    action: string;
    timestamp: string;
  }>;
  atRiskFieldsList: Array<{
    id: string;
    name: string;
    cropType: CropType;
    agentName: string;
    riskReason: string;
    daysAtRisk: number;
  }>;
  weeklyTrend: {
    labels: string[];
    updatesCount: number[];
    newFieldsCount: number[];
  };
}

// Dashboard Agent
export interface AgentDashboard {
  totalFieldsAssigned: number;
  activeFields: number;
  atRiskFields: number;
  completedFields: number;
  myStageDistribution: Record<string, number>;
  myRecentUpdates: Array<{
    id: string;
    fieldName: string;
    fieldId: string;
    previousStage?: FieldStage;
    newStage: FieldStage;
    notes?: string;
    timestamp: string;
  }>;
  myAtRiskFields: Array<{
    id: string;
    name: string;
    cropType: CropType;
    currentStage: FieldStage;
    riskReason: string;
    daysSinceLastUpdate: number;
  }>;
  myPerformance: {
    totalUpdates: number;
    updatesThisWeek: number;
    updatesThisMonth: number;
    averageResponseTime: number;
    completionRate: number;
    performanceScore: number;
    rankAmongAgents?: number;
  };
  pendingTasks: Array<{
    fieldId: string;
    fieldName: string;
    currentStage: FieldStage;
    daysSinceLastUpdate: number;
    suggestedAction: string;
  }>;
  weeklyActivity: {
    labels: string[];
    myUpdates: number[];
  };
}

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
  forceLogin?: boolean;
}

// Force Login Response
export interface ForceLoginResponse {
  requireForceLogin: true;
  user: {
    email: string;
    name: string;
  };
}

// Auth Response
export type AuthResponse = User | ForceLoginResponse;

// Query Filter Types
export interface FieldFilters {
  page?: number;
  limit?: number;
  status?: FieldStatus;
  cropType?: CropType;
  agentId?: string;
  stage?: FieldStage;
  search?: string;
}

export interface FieldUpdateFilters {
  page?: number;
  limit?: number;
  fieldId?: string;
}
