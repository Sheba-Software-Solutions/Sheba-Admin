import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  FolderOpen,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { apiHelpers } from "../utils/api";
import { useToast } from "../hooks/useToast";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [metricsChart, setMetricsChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch dashboard overview data
      const overviewResponse = await apiHelpers.getDashboardOverview();
      setOverviewData(overviewResponse.data);

      // Fetch recent activities
      const activitiesResponse = await apiHelpers.getRecentActivities();
      setRecentActivities(activitiesResponse.data);

      // Fetch revenue metrics (monthly) and transform to chart format
      const chartResponse = await apiHelpers.getMetricsChart({
        type: "revenue_monthly",
      });
      const rawMetrics = Array.isArray(chartResponse.data)
        ? chartResponse.data
        : [];
      const monthBuckets = rawMetrics.reduce((acc, m) => {
        try {
          const d = new Date(m.date);
          if (isNaN(d)) return acc;
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          acc[key] = (acc[key] || 0) + Number(m.value || 0);
        } catch (e) {
          // ignore bad entries
        }
        return acc;
      }, {});
      const orderedKeys = Object.keys(monthBuckets).sort((a, b) => {
        const [ay, am] = a.split("-").map(Number);
        const [by, bm] = b.split("-").map(Number);
        return ay === by ? am - bm : ay - by;
      });
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const transformed = orderedKeys.map((k) => {
        const [y, m] = k.split("-").map(Number);
        return { month: monthNames[m], year: y, revenue: monthBuckets[k] };
      });
      setMetricsChart(transformed);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      showToast("Failed to load dashboard data", "error");

      // Set fallback data if API fails
      setOverviewData({
        projects: { total: 45, active: 12, completed: 28, completion_rate: 62 },
        clients: { total: 28, active: 24 },
        content: { blog_posts: 15, published_posts: 12 },
        communication: { pending_contacts: 3 },
        activity: { recent_activities: 8 },
      });
      setRecentActivities([
        {
          id: 1,
          description: "New project created",
          model_name: "EthioPay Mobile App",
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          action: "create",
        },
        {
          id: 2,
          description: "Client meeting scheduled",
          model_name: "AgriTech Platform",
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          action: "update",
        },
        {
          id: 3,
          description: "Project completed",
          model_name: "HealthLink Website",
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          action: "delete",
        },
        {
          id: 4,
          description: "New client onboarded",
          model_name: "TechCorp Solutions",
          created_at: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          action: "login",
        },
      ]);
      setMetricsChart([
        { month: "Jan", revenue: 65000, projects: 8 },
        { month: "Feb", revenue: 72000, projects: 10 },
        { month: "Mar", revenue: 68000, projects: 9 },
        { month: "Apr", revenue: 78000, projects: 12 },
        { month: "May", revenue: 85000, projects: 15 },
        { month: "Jun", revenue: 92000, projects: 18 },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats from API data
  const stats = overviewData
    ? {
        totalProjects: overviewData.projects?.total || 45,
        activeProjects: overviewData.projects?.active || 12,
        totalClients: overviewData.clients?.total || 28,
        monthlyRevenue: 85000, // Will be populated when revenue metrics are added
        projectsChange: 12,
        clientsChange: 8,
        revenueChange: 15,
      }
    : {
        totalProjects: 45,
        activeProjects: 12,
        totalClients: 28,
        monthlyRevenue: 85000,
        projectsChange: 12,
        clientsChange: 8,
        revenueChange: 15,
      };

  // Revenue data from API or fallback
  const revenueData =
    metricsChart.length > 0
      ? metricsChart
      : [
          { month: "Jan", revenue: 65000, projects: 8 },
          { month: "Feb", revenue: 72000, projects: 10 },
          { month: "Mar", revenue: 68000, projects: 9 },
          { month: "Apr", revenue: 78000, projects: 12 },
          { month: "May", revenue: 85000, projects: 15 },
          { month: "Jun", revenue: 92000, projects: 18 },
        ];

  // Project status data from API
  const projectStatusData = overviewData
    ? [
        {
          name: "Completed",
          value: overviewData.projects?.completed || 28,
          color: "#10b981",
        },
        {
          name: "Active",
          value: overviewData.projects?.active || 12,
          color: "#3b82f6",
        },
        {
          name: "Planning",
          value:
            (overviewData.projects?.total || 45) -
            (overviewData.projects?.active || 12) -
            (overviewData.projects?.completed || 28),
          color: "#f59e0b",
        },
      ]
    : [
        { name: "Completed", value: 28, color: "#10b981" },
        { name: "Active", value: 12, color: "#3b82f6" },
        { name: "Planning", value: 5, color: "#f59e0b" },
      ];

  // Transform recent activities for display
  const formattedActivities =
    recentActivities.length > 0
      ? recentActivities.map((activity) => ({
          id: activity.id,
          action: activity.description,
          project: activity.model_name,
          time: new Date(activity.created_at).toLocaleString(),
          type: activity.action,
        }))
      : [
          {
            id: 1,
            action: "New project created",
            project: "EthioPay Mobile App",
            time: "2 hours ago",
            type: "create",
          },
          {
            id: 2,
            action: "Client meeting scheduled",
            project: "AgriTech Platform",
            time: "4 hours ago",
            type: "update",
          },
          {
            id: 3,
            action: "Project completed",
            project: "HealthLink Website",
            time: "1 day ago",
            type: "delete",
          },
          {
            id: 4,
            action: "New client onboarded",
            project: "TechCorp Solutions",
            time: "2 days ago",
            type: "login",
          },
        ];

  const quickActions = [
    {
      name: "New Project",
      icon: FolderOpen,
      color: "bg-blue-600",
      href: "/projects",
    },
    {
      name: "Add Client",
      icon: Users,
      color: "bg-green-600",
      href: "/clients",
    },
    {
      name: "Create Content",
      icon: CheckCircle,
      color: "bg-purple-600",
      href: "/content",
    },
    {
      name: "View Messages",
      icon: Activity,
      color: "bg-orange-600",
      href: "/communication",
    },
  ];

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with your business.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Projects
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalProjects}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  +{stats.projectsChange}%
                </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Projects
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.activeProjects}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+3</span>
                <span className="text-sm text-gray-500">new this week</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Clients
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalClients}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  +{stats.clientsChange}%
                </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${stats.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  +{stats.revenueChange}%
                </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Revenue Trend
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Project Status Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Project Status
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {projectStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name} ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activities
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {formattedActivities.length > 0 ? (
                  formattedActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "create"
                            ? "bg-blue-100"
                            : activity.type === "update"
                              ? "bg-yellow-100"
                              : activity.type === "delete"
                                ? "bg-red-100"
                                : "bg-purple-100"
                        }`}
                      >
                        {activity.type === "create" && (
                          <FolderOpen className="w-5 h-5 text-blue-600" />
                        )}
                        {activity.type === "update" && (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                        {activity.type === "delete" && (
                          <CheckCircle className="w-5 h-5 text-red-600" />
                        )}
                        {activity.type === "login" && (
                          <Users className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.project}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No recent activities found.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.href}
                      className={`flex items-center gap-3 p-4 rounded-xl ${action.color} text-white hover:opacity-90 transition-all duration-200 hover:scale-105`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{action.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
