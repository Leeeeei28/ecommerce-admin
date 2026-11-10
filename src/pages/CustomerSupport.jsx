
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
} from "lucide-react";

import "./CustomerSupport.css";

function CustomerSupport() {
  const stats = [
    {
      title: "Total Tickets",
      value: "1,284",
      change: "+12.5%",
      positive: true,
      icon: Ticket,
      color: "blue",
    },
    {
      title: "Open Tickets",
      value: "124",
      change: "+8.2%",
      positive: false,
      icon: AlertTriangle,
      color: "orange",
    },
    {
      title: "In Progress",
      value: "86",
      change: "+4.3%",
      positive: true,
      icon: Clock,
      color: "purple",
    },
    {
      title: "Resolved Tickets",
      value: "1,074",
      change: "+15.8%",
      positive: true,
      icon: CheckCircle,
      color: "green",
    },
  ];

  const tickets = [
    {
      id: "TCK-1001",
      customer: "John Smith",
      subject: "Payment not reflected",
      priority: "High",
      status: "Open",
      date: "Nov 10, 2026",
    },
    {
      id: "TCK-1002",
      customer: "Maria Santos",
      subject: "Unable to access account",
      priority: "Medium",
      status: "In Progress",
      date: "Nov 10, 2026",
    },
    {
      id: "TCK-1003",
      customer: "David Johnson",
      subject: "Order delivery concern",
      priority: "Low",
      status: "Resolved",
      date: "Nov 09, 2026",
    },
    {
      id: "TCK-1004",
      customer: "Sarah Wilson",
      subject: "Refund request",
      priority: "High",
      status: "Open",
      date: "Nov 09, 2026",
    },
    {
      id: "TCK-1005",
      customer: "Michael Brown",
      subject: "Subscription renewal issue",
      priority: "Medium",
      status: "In Progress",
      date: "Nov 08, 2026",
    },
  ];

  return (
    <div className="support-dashboard">

      {/* Page Heading */}
      <div className="support-heading">
        <div>
          <h2>Customer Support Overview</h2>
          <p>Monitor customer requests, tickets, and support activities.</p>
        </div>

        <button className="create-ticket-btn">
          <Ticket size={17} />
          Create Ticket
        </button>
      </div>

      {/* Statistics */}
      <div className="support-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="support-stat-card" key={stat.title}>
              <div className="support-stat-top">
                <div className={`support-stat-icon ${stat.color}`}>
                  <Icon size={21} />
                </div>

                <span className={stat.positive ? "positive-change" : "negative-change"}>
                  {stat.positive ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {stat.change}
                </span>
              </div>

              <div className="support-stat-info">
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Overview */}
      <div className="support-overview-grid">

        <div className="support-panel priority-panel">
          <div className="support-panel-heading">
            <div>
              <h3>Ticket Priority Overview</h3>
              <p>Distribution of customer support tickets</p>
            </div>
          </div>

          <div className="priority-list">

            <div className="priority-item">
              <div className="priority-details">
                <span className="priority-dot high"></span>
                <span>High Priority</span>
                <strong>42</strong>
              </div>
              <div className="priority-progress">
                <div className="priority-fill high-fill"></div>
              </div>
            </div>

            <div className="priority-item">
              <div className="priority-details">
                <span className="priority-dot medium"></span>
                <span>Medium Priority</span>
                <strong>68</strong>
              </div>
              <div className="priority-progress">
                <div className="priority-fill medium-fill"></div>
              </div>
            </div>

            <div className="priority-item">
              <div className="priority-details">
                <span className="priority-dot low"></span>
                <span>Low Priority</span>
                <strong>14</strong>
              </div>
              <div className="priority-progress">
                <div className="priority-fill low-fill"></div>
              </div>
            </div>

          </div>
        </div>

        <div className="support-panel quick-info-panel">
          <div className="support-panel-heading">
            <div>
              <h3>Support Summary</h3>
              <p>Current support performance</p>
            </div>
          </div>

          <div className="support-summary-item">
            <span>Average Response Time</span>
            <strong>18 min</strong>
          </div>

          <div className="support-summary-item">
            <span>Average Resolution Time</span>
            <strong>4.2 hrs</strong>
          </div>

          <div className="support-summary-item">
            <span>Customer Satisfaction</span>
            <strong className="satisfaction-value">94.8%</strong>
          </div>
        </div>

      </div>

      {/* Recent Tickets */}
      <div className="support-panel recent-tickets-panel">

        <div className="support-panel-heading">
          <div>
            <h3>Recent Support Tickets</h3>
            <p>Latest customer support requests</p>
          </div>

          <button className="view-all-btn">
            View All
          </button>
        </div>

        <div className="support-table-wrapper">
          <table className="support-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date Created</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="ticket-id">{ticket.id}</td>
                  <td>{ticket.customer}</td>
                  <td>{ticket.subject}</td>

                  <td>
                    <span className={`ticket-priority ${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                  </td>

                  <td>
                    <span className={`ticket-status ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                      {ticket.status}
                    </span>
                  </td>

                  <td>{ticket.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default CustomerSupport;
