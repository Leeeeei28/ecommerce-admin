
import { useState } from "react";

import {
  Download,
  TrendingUp,
  ShoppingCart,
  Wallet,
  Users,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import "./ReportsAnalytics.css";

function ReportsAnalytics() {
  const [period, setPeriod] = useState("Monthly");
  const [reportType, setReportType] = useState("All Reports");

  const reports = [
    { month: "Jan", revenue: 32000, orders: 120 },
    { month: "Feb", revenue: 45000, orders: 150 },
    { month: "Mar", revenue: 38000, orders: 135 },
    { month: "Apr", revenue: 58000, orders: 190 },
    { month: "May", revenue: 52000, orders: 175 },
    { month: "Jun", revenue: 72000, orders: 230 },
    { month: "Jul", revenue: 65000, orders: 215 },
    { month: "Aug", revenue: 85000, orders: 270 },
    { month: "Sep", revenue: 76000, orders: 245 },
    { month: "Oct", revenue: 95000, orders: 310 },
    { month: "Nov", revenue: 110000, orders: 350 },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "₱485,250",
      icon: Wallet,
      change: "+12.5%",
    },
    {
      title: "Total Orders",
      value: "1,284",
      icon: ShoppingCart,
      change: "+8.2%",
    },
    {
      title: "Average Order Value",
      value: "₱377.92",
      icon: TrendingUp,
      change: "+4.6%",
    },
    {
      title: "Active Customers",
      value: "3,642",
      icon: Users,
      change: "+5.4%",
    },
  ];

  const filteredReports =
    reportType === "Revenue"
      ? reports.map((item) => ({ ...item, orders: 0 }))
      : reportType === "Orders"
      ? reports.map((item) => ({ ...item, revenue: 0 }))
      : reports;

  const handleExport = () => {
    const headers = ["Month", "Revenue", "Orders"];

    const rows = filteredReports.map((item) => [
      item.month,
      item.revenue,
      item.orders,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "business-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-analytics">
      <div className="reports-header">
        <div>
          <h2>Reports & Analytics</h2>
          <p>Analyze business performance and generate reports.</p>
        </div>

        <button className="reports-export-btn" onClick={handleExport}>
          <Download size={17} />
          Export Report
        </button>
      </div>

      <div className="reports-filters">
        <div className="report-filter">
          <label>Report Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>

        <div className="report-filter">
          <label>Report Category</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option>All Reports</option>
            <option>Revenue</option>
            <option>Orders</option>
          </select>
        </div>
      </div>

      <div className="reports-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div className="reports-stat-card" key={index}>
              <div className="reports-stat-icon">
                <Icon size={21} />
              </div>

              <p>{stat.title}</p>
              <h3>{stat.value}</h3>

              <span>
                <TrendingUp size={14} />
                {stat.change} from previous period
              </span>
            </div>
          );
        })}
      </div>

      <div className="reports-chart-panel">
        <div className="reports-chart-header">
          <div>
            <h3>Business Performance</h3>
            <p>
              {reportType === "All Reports"
                ? "Revenue and orders comparison"
                : `${reportType} performance`}
            </p>
          </div>

          <span className="reports-year">2026</span>
        </div>

        <div className="reports-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredReports}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                formatter={(value, name) => [
                  name === "Revenue"
                    ? `₱${value.toLocaleString()}`
                    : value,
                  name,
                ]}
              />

              <Legend />

              {(reportType === "All Reports" ||
                reportType === "Revenue") && (
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#2563EB"
                  radius={[5, 5, 0, 0]}
                />
              )}

              {(reportType === "All Reports" ||
                reportType === "Orders") && (
                <Bar
                  dataKey="orders"
                  name="Orders"
                  fill="#16A34A"
                  radius={[5, 5, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="reports-table-panel">
        <div className="reports-table-header">
          <div>
            <h3>Monthly Report Summary</h3>
            <p>Detailed monthly business records</p>
          </div>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Orders</th>
                <th>Average Order Value</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((item) => (
                <tr key={item.month}>
                  <td>{item.month} 2026</td>
                  <td>₱{item.revenue.toLocaleString()}</td>
                  <td>{item.orders.toLocaleString()}</td>
                  <td>
                    {item.orders > 0
                      ? `₱${(item.revenue / item.orders).toFixed(2)}`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
