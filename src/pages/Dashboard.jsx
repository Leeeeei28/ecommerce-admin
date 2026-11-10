
import {
  Wallet,
  CreditCard,
  Users,
  Headset,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₱125,450",
      change: "+12.5%",
      icon: Wallet,
      color: "blue",
    },
    {
      title: "Total Transactions",
      value: "1,284",
      change: "+8.2%",
      icon: CreditCard,
      color: "green",
    },
    {
      title: "Active Subscriptions",
      value: "356",
      change: "+5.4%",
      icon: Users,
      color: "purple",
    },
    {
      title: "Open Support Tickets",
      value: "24",
      change: "-2.1%",
      icon: Headset,
      color: "orange",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 22000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 30000 },
    { month: "May", revenue: 25000 },
    { month: "Jun", revenue: 40000 },
    { month: "Jul", revenue: 35000 },
    { month: "Aug", revenue: 48000 },
    { month: "Sep", revenue: 42000 },
    { month: "Oct", revenue: 55000 },
    { month: "Nov", revenue: 62000 },
    { month: "Dec", revenue: 70000 },
  ];

  const transactions = [
    {
      id: "#TRX-1001",
      customer: "John Smith",
      date: "Nov 10, 2026",
      amount: "₱2,500",
      status: "Completed",
    },
    {
      id: "#TRX-1002",
      customer: "Sarah Johnson",
      date: "Nov 10, 2026",
      amount: "₱1,200",
      status: "Pending",
    },
    {
      id: "#TRX-1003",
      customer: "Michael Brown",
      date: "Nov 09, 2026",
      amount: "₱3,800",
      status: "Completed",
    },
    {
      id: "#TRX-1004",
      customer: "Emily Davis",
      date: "Nov 09, 2026",
      amount: "₱950",
      status: "Failed",
    },
  ];

  const activities = [
    {
      title: "New customer registered",
      description: "John Smith created an account.",
      time: "10 minutes ago",
    },
    {
      title: "Payment received",
      description: "Transaction #TRX-1001 completed.",
      time: "30 minutes ago",
    },
    {
      title: "New support ticket",
      description: "A customer submitted a complaint.",
      time: "1 hour ago",
    },
    {
      title: "Subscription renewed",
      description: "Premium subscription renewed.",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="dashboard">

      {/* Dashboard Heading */}
      <div className="dashboard-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>
            Here's what's happening with your business today.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>

              <div className={`stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>

              <div className="stat-info">
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>

                <span>
                  <TrendingUp size={14} />
                  {stat.change} from last month
                </span>
              </div>

            </div>
          );
        })}

      </div>

      {/* Revenue Overview */}
      <div className="revenue-section">

        <div className="section-header">
          <div>
            <h3>Revenue Overview</h3>
            <p>Monthly revenue performance</p>
          </div>

          <span className="revenue-label">2026</span>
        </div>

        <div className="revenue-chart">

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>

              <defs>
                <linearGradient
                  id="revenueColor"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563EB"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₱${value.toLocaleString()}`
                }
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#revenueColor)"
              />

            </AreaChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* Recent Transactions and Activities */}
      <div className="dashboard-bottom">

        {/* Recent Transactions */}
        <div className="recent-transactions">

          <div className="section-header">
            <h3>Recent Transactions</h3>
            <button>View All</button>
          </div>

          <div className="transaction-list">

            {transactions.map((transaction) => (
              <div
                className="transaction-row"
                key={transaction.id}
              >

                <div className="transaction-details">
                  <h4>{transaction.customer}</h4>
                  <span>
                    {transaction.id} · {transaction.date}
                  </span>
                </div>

                <div className="transaction-meta">
                  <h4>{transaction.amount}</h4>

                  <span
                    className={`status ${transaction.status.toLowerCase()}`}
                  >
                    {transaction.status}
                  </span>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Recent Activities */}
        <div className="recent-activities">

          <div className="section-header">
            <h3>Recent Activities</h3>
            <button>View All</button>
          </div>

          <div className="activity-list">

            {activities.map((activity, index) => (
              <div className="activity-item" key={index}>

                <div className="activity-indicator"></div>

                <div>
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

export default Dashboard;
    