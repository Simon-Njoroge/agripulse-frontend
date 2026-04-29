import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';
import { useAdminDashboard } from '@/hooks/useDashboard';
import { StatCard } from '@/components/StatCard';
import { TrendChart, DistributionChart, BarChartComponent } from '@/components/Charts';
import { formatDate, fieldStatusLabels, cropTypeLabels } from '@/utils/helpers';
import { Loader } from 'lucide-react';

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data, isLoading, error } = useAdminDashboard();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  // Prepare chart data
  const trendData = data.weeklyTrend.labels.map((label, idx) => ({
    name: label,
    Updates: data.weeklyTrend.updatesCount[idx],
    'New Fields': data.weeklyTrend.newFieldsCount[idx],
  }));

  const cropDistData = Object.entries(data.cropDistribution).map(
    ([crop, count]) => ({
      name: cropTypeLabels[crop as keyof typeof cropTypeLabels] || crop,
      value: count,
    })
  );

  const stageDistData = Object.entries(data.stageDistribution).map(
    ([stage, count]) => ({
      name: stage,
      value: count,
    })
  );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of all farming operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Fields"
            value={data.totalFields}
            icon={BarChart3}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            title="Active Fields"
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
            icon={Activity}
            bgColor="bg-purple-50"
            textColor="text-purple-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrendChart
            data={trendData}
            xKey="name"
            yKeys={['Updates', 'New Fields']}
            title="Weekly Activity Trend"
          />
          <DistributionChart
            data={cropDistData}
            title="Crop Distribution"
          />
        </div>

        {/* At Risk Fields */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">At Risk Fields</h3>
          {data.atRiskFieldsList && data.atRiskFieldsList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Field Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Crop Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Agent
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Risk Reason
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Days at Risk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.atRiskFieldsList.map((field) => (
                    <tr key={field.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{field.name}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {cropTypeLabels[field.cropType] || field.cropType}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{field.agentName}</td>
                      <td className="py-3 px-4 text-gray-600">{field.riskReason}</td>
                      <td className="py-3 px-4">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {field.daysAtRisk} days
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No fields at risk</p>
          )}
        </div>

        {/* Agent Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance</h3>
          {data.agentPerformance && data.agentPerformance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Agent Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Fields Assigned
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Updates This Week
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Completion Rate
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Performance Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.agentPerformance.map((agent) => (
                    <tr key={agent.agentId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {agent.agentName}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{agent.fieldsAssigned}</td>
                      <td className="py-3 px-4 text-gray-600">{agent.updatesThisWeek}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${agent.completionRate * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {(agent.completionRate * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {agent.performanceScore.toFixed(1)}/10
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No agent data available</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          {data.recentActivity && data.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {data.recentActivity.slice(0, 10).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{activity.fieldName}</p>
                    <p className="text-sm text-gray-600">
                      {activity.agentName} - {activity.action}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(activity.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}
