
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import "./LogisticsOverview.css";

function LogisticsOverview() {
  const stats = [
    {
      title: "Total Shipments",
      value: "2,486",
      change: "+12.8%",
      icon: Package,
      color: "blue",
    },
    {
      title: "In Transit",
      value: "384",
      change: "+8.4%",
      icon: Truck,
      color: "orange",
    },
    {
      title: "Delivered",
      value: "1,942",
      change: "+15.2%",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Delayed",
      value: "28",
      change: "-3.5%",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const shipments = [
    {
      id: "SHP-1001",
      customer: "John Smith",
      destination: "Quezon City",
      date: "Nov 12, 2026",
      status: "In Transit",
    },
    {
      id: "SHP-1002",
      customer: "Sarah Johnson",
      destination: "Makati City",
      date: "Nov 12, 2026",
      status: "Delivered",
    },
    {
      id: "SHP-1003",
      customer: "Michael Brown",
      destination: "Cebu City",
      date: "Nov 11, 2026",
      status: "Pending",
    },
    {
      id: "SHP-1004",
      customer: "Emily Davis",
      destination: "Davao City",
      date: "Nov 11, 2026",
      status: "Delayed",
    },
    {
      id: "SHP-1005",
      customer: "Daniel Wilson",
      destination: "Pasig City",
      date: "Nov 10, 2026",
      status: "Delivered",
    },
  ];

  return (
    <div className="logistics-overview">
      <div className="logistics-heading">
        <div>
          <h2>Logistics Overview</h2>
          <p>Monitor shipments and delivery operations.</p>
        </div>

        <button className="logistics-date-button">
          November 2026
        </button>
      </div>

      <div className="logistics-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="logistics-stat-card" key={stat.title}>
              <div className={`logistics-stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>

              <div className="logistics-stat-info">
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
                <span>{stat.change} from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="logistics-main-grid">
        <div className="logistics-panel">
          <div className="logistics-panel-header">
            <div>
              <h3>Delivery Status</h3>
              <p>Current shipment distribution</p>
            </div>
          </div>

          <div className="delivery-status-list">
            <div className="delivery-status-item">
              <div className="delivery-status-label">
                <span className="status-dot delivered-dot"></span>
                <span>Delivered</span>
                <strong>1,942</strong>
              </div>
              <div className="delivery-progress">
                <div className="progress-fill delivered-fill"></div>
              </div>
            </div>

            <div className="delivery-status-item">
              <div className="delivery-status-label">
                <span className="status-dot transit-dot"></span>
                <span>In Transit</span>
                <strong>384</strong>
              </div>
              <div className="delivery-progress">
                <div className="progress-fill transit-fill"></div>
              </div>
            </div>

            <div className="delivery-status-item">
              <div className="delivery-status-label">
                <span className="status-dot pending-dot"></span>
                <span>Pending</span>
                <strong>132</strong>
              </div>
              <div className="delivery-progress">
                <div className="progress-fill pending-fill"></div>
              </div>
            </div>

            <div className="delivery-status-item">
              <div className="delivery-status-label">
                <span className="status-dot delayed-dot"></span>
                <span>Delayed</span>
                <strong>28</strong>
              </div>
              <div className="delivery-progress">
                <div className="progress-fill delayed-fill"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="logistics-panel">
          <div className="logistics-panel-header">
            <div>
              <h3>Delivery Performance</h3>
              <p>Overall logistics performance</p>
            </div>
          </div>

          <div className="performance-content">
            <div className="performance-circle">
              <div>
                <h2>94.8%</h2>
                <span>On-time Delivery</span>
              </div>
            </div>

            <div className="performance-details">
              <div>
                <span>Average Delivery Time</span>
                <strong>2.4 Days</strong>
              </div>

              <div>
                <span>Successful Deliveries</span>
                <strong>1,942</strong>
              </div>

              <div>
                <span>Delivery Issues</span>
                <strong>28</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="logistics-panel logistics-recent-panel">
        <div className="logistics-panel-header">
          <div>
            <h3>Recent Shipments</h3>
            <p>Latest shipment activities and updates</p>
          </div>

          <span className="shipment-record-count">
            5 Recent Records
          </span>
        </div>

        <div className="logistics-table-wrapper">
          <table className="logistics-table">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Ship Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td className="shipment-id">{shipment.id}</td>
                  <td>{shipment.customer}</td>
                  <td>
                    <span className="shipment-destination">
                      <MapPin size={14} />
                      {shipment.destination}
                    </span>
                  </td>
                  <td>{shipment.date}</td>
                  <td>
                    <span
                      className={`shipment-status ${shipment.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {shipment.status}
                    </span>
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

export default LogisticsOverview;
