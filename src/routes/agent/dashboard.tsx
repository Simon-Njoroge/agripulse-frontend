import { createFileRoute } from '@tanstack/react-router';
import {
  BookOpen,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Loader,
} from 'lucide-react';
import { useAgentDashboard } from '@/hooks/useDashboard';
import { StatCard } from '@/components/StatCard';
import { TrendChart } from '@/components/Charts';
import { formatDate, fieldStageLabels } from '@/utils/helpers';

export const Route = createFileRoute('/agent/dashboard')({
  component: AgentDashboard,
});

function AgentDashboard() {
  const { data, isLoading, error } = useAgentDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    );
  }

 
  const activityData = data.weeklyActivity.labels.map((label, idx) => ({
    day: label,
    Updates: data.weeklyActivity.myUpdates[idx],
  }));

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Your field monitoring overview</p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="My Fields"
            value={data.totalFieldsAssigned}
            icon={BookOpen}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            title="Active"
            value={data.activeFields}
            icon={TrendingUp}
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <StatCard
            title="At Risk"
            value={data.atRiskFields}
            icon={AlertTriangle}
            bgColor="bg-red-50"
            textColor="text-red-600"
          />
          <StatCard
            title="Completed"
            value={data.completedFields}
            icon={CheckCircle}
            bgColor="bg-purple-50"
            textColor="text-purple-600"
          />
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Performance Score</span>
                  <span className="text-2xl font-bold text-green-600">
                    {data.myPerformance.performanceScore.toFixed(1)}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${data.myPerformance.performanceScore * 10}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-600">Completion Rate</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {(data.myPerformance.completionRate * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Rank Among Agents</p>
                  <p className="text-lg font-semibold text-gray-900">
                    #{data.myPerformance.rankAmongAgents || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <p className="text-xs text-gray-600">This Week</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.myPerformance.updatesThisWeek}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">This Month</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.myPerformance.updatesThisMonth}
                  </p>
                </div>
              </div>
            </div>
          </div>

      
          <div className="lg:col-span-2">
            <TrendChart
              data={activityData}
              xKey="day"
              yKeys={['Updates']}
              title="Weekly Activity"
              colors={['#10b981']}
            />
          </div>
        </div>

        
        {data.myAtRiskFields && data.myAtRiskFields.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fields Requiring Attention</h3>
            <div className="space-y-3">
              {data.myAtRiskFields.map((field) => (
                <div
                  key={field.id}
                  className="p-4 border border-red-200 bg-red-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{field.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Stage: {fieldStageLabels[field.currentStage] || field.currentStage}
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        ⚠️ {field.riskReason}
                      </p>
                    </div>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {field.daysSinceLastUpdate} days since last update
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {data.pendingTasks && data.pendingTasks.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              {data.pendingTasks.map((task) => (
                <div
                  key={task.fieldId}
                  className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{task.fieldName}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Current: {fieldStageLabels[task.currentStage] || task.currentStage}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        📋 {task.suggestedAction}
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      {task.daysSinceLastUpdate} days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

       
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
          {data.myRecentUpdates && data.myRecentUpdates.length > 0 ? (
            <div className="space-y-3">
              {data.myRecentUpdates.slice(0, 10).map((update) => (
                <div
                  key={update.id}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{update.fieldName}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Updated to{' '}
                        <span className="font-medium">
                          {fieldStageLabels[update.newStage] || update.newStage}
                        </span>
                      </p>
                      {update.notes && (
                        <p className="text-sm text-gray-600 mt-1">📝 {update.notes}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(update.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No recent updates</p>
          )}
        </div>
      </div>
    </div>
  );
}
