
import {
  Users,
  ShoppingCart,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "./AnalyticsOverview.css";

function AnalyticsOverview() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₱485,250",
      change: "+12.5%",
      positive: true,
      icon: Wallet,
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.2%",
      positive: true,
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: "3,642",
      change: "+5.4%",
      positive: true,
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "3.8%",
      change: "-1.2%",
      positive: false,
      icon: TrendingUp,
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 45000 },
    { month: "Mar", revenue: 38000 },
    { month: "Apr", revenue: 58000 },
    { month: "May", revenue: 52000 },
    { month: "Jun", revenue: 72000 },
    { month: "Jul", revenue: 65000 },
    { month: "Aug", revenue: 85000 },
    { month: "Sep", revenue: 76000 },
    { month: "Oct", revenue: 95000 },
    { month: "Nov", revenue: 110000 },
  ];

  const activities = [
    {
      title: "New customer registered",
      description: "Maria Santos created an account.",
      time: "5 minutes ago",
      type: "customer",
    },
    {
      title: "New order received",
      description: "Order ORD-2048 was placed.",
      time: "18 minutes ago",
      type: "order",
    },
    {
      title: "Payment completed",
      description: "Payment PAY-1042 was successful.",
      time: "32 minutes ago",
      type: "payment",
    },
    {
      title: "New support ticket",
      description: "Ticket TCK-1088 was submitted.",
      time: "1 hour ago",
      type: "support",
    },
  ];

  return (
    <div className="analytics-overview">
      <div className="analytics-page-header">
        <div>
          <h2>Analytics Overview</h2>
          <p>Monitor your business performance and key metrics.</p>
        </div>

        <span className="analytics-date">November 2026</span>
      </div>

      <div className="analytics-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div className="analytics-stat-card" key={index}>
              <div className="analytics-stat-top">
                <div className="analytics-stat-icon">
                  <Icon size={21} />
                </div>

                <span
                  className={`analytics-stat-change ${
                    stat.positive ? "positive" : "negative"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight size={15} />
                  ) : (
                    <ArrowDownRight size={15} />
                  )}
                  {stat.change}
                </span>
              </div>

              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="analytics-main-grid">
        <div className="analytics-panel revenue-panel">
          <div className="analytics-panel-header">
            <div>
              <h3>Revenue Overview</h3>
              <p>Monthly revenue performance</p>
            </div>

            <span className="analytics-period">2026</span>
          </div>

          <div className="revenue-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopOpacity={0.25} />
                    <stop offset="95%" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `₱${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-panel activity-panel">
          <div className="analytics-panel-header">
            <div>
              <h3>Recent Activities</h3>
              <p>Latest system updates</p>
            </div>
          </div>

          <div className="analytics-activity-list">
            {activities.map((activity, index) => (
              <div className="analytics-activity-item" key={index}>
                <span
                  className={`activity-indicator ${activity.type}`}
                ></span>

                <div className="activity-details">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsOverview;
