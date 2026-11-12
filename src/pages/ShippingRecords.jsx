
import { useState } from "react";

import {
  Search,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
} from "lucide-react";

import "./ShippingRecords.css";

function ShippingRecords() {
  const initialRecords = [
    {
      id: "SHP-1001",
      orderId: "ORD-2001",
      customer: "John Smith",
      courier: "J&T Express",
      origin: "Manila",
      destination: "Quezon City",
      date: "Nov 12, 2026",
      status: "In Transit",
    },
    {
      id: "SHP-1002",
      orderId: "ORD-2002",
      customer: "Sarah Johnson",
      courier: "LBC Express",
      origin: "Makati",
      destination: "Makati City",
      date: "Nov 12, 2026",
      status: "Delivered",
    },
    {
      id: "SHP-1003",
      orderId: "ORD-2003",
      customer: "Michael Brown",
      courier: "J&T Express",
      origin: "Manila",
      destination: "Cebu City",
      date: "Nov 12, 2026",
      status: "Pending",
    },
    {
      id: "SHP-1004",
      orderId: "ORD-2004",
      customer: "Emily Davis",
      courier: "Flash Express",
      origin: "Pasig",
      destination: "Davao City",
      date: "Nov 11, 2026",
      status: "Delayed",
    },
    {
      id: "SHP-1005",
      orderId: "ORD-2005",
      customer: "Daniel Wilson",
      courier: "J&T Express",
      origin: "Manila",
      destination: "Pasig City",
      date: "Nov 10, 2026",
      status: "Delivered",
    },
    {
      id: "SHP-1006",
      orderId: "ORD-2006",
      customer: "Olivia Martinez",
      courier: "LBC Express",
      origin: "Cavite",
      destination: "Taguig City",
      date: "Nov 10, 2026",
      status: "In Transit",
    },
    {
      id: "SHP-1007",
      orderId: "ORD-2007",
      customer: "James Anderson",
      courier: "Flash Express",
      origin: "Manila",
      destination: "Baguio City",
      date: "Nov 09, 2026",
      status: "Delivered",
    },
  ];

  const [records, setRecords] = useState(initialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const stats = [
    {
      title: "Total Shipments",
      value: records.length,
      icon: Package,
      color: "blue",
    },
    {
      title: "Delivered",
      value: records.filter((record) => record.status === "Delivered").length,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "In Transit",
      value: records.filter((record) => record.status === "In Transit").length,
      icon: Truck,
      color: "orange",
    },
    {
      title: "Delayed",
      value: records.filter((record) => record.status === "Delayed").length,
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id ? { ...record, status: newStatus } : record
      )
    );

    setSelectedRecord((currentRecord) =>
      currentRecord
        ? { ...currentRecord, status: newStatus }
        : null
    );
  };

  return (
    <div className="shipping-records">
      <div className="shipping-records-heading">
        <div>
          <h2>Shipping Records</h2>
          <p>Manage and review all shipment records.</p>
        </div>
      </div>

      <div className="shipping-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="shipping-stat-card" key={stat.title}>
              <div className={`shipping-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>

              <div>
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shipping-records-panel">
        <div className="shipping-records-panel-header">
          <div>
            <h3>All Shipment Records</h3>
            <p>Search, filter, and review shipment information.</p>
          </div>
        </div>

        <div className="shipping-filters">
          <div className="shipping-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search shipment, order, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>

        <div className="shipping-table-wrapper">
          <table className="shipping-records-table">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Courier</th>
                <th>Destination</th>
                <th>Ship Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="shipping-id">{record.id}</td>
                    <td>{record.orderId}</td>
                    <td>{record.customer}</td>
                    <td>{record.courier}</td>
                    <td>{record.destination}</td>
                    <td>{record.date}</td>
                    <td>
                      <span
                        className={`shipping-status ${record.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="shipping-view-button"
                        onClick={() => setSelectedRecord(record)}
                        title="View shipment"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="shipping-no-records">
                    No shipment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="shipping-table-footer">
          Showing {filteredRecords.length} of {records.length} records
        </div>
      </div>

      {selectedRecord && (
        <div
          className="shipping-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="shipping-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shipping-modal-header">
              <div>
                <h3>Shipment Details</h3>
                <p>{selectedRecord.id}</p>
              </div>

              <button
                className="shipping-close-button"
                onClick={() => setSelectedRecord(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="shipping-modal-body">
              <div className="shipping-detail-row">
                <span>Order ID</span>
                <strong>{selectedRecord.orderId}</strong>
              </div>

              <div className="shipping-detail-row">
                <span>Customer</span>
                <strong>{selectedRecord.customer}</strong>
              </div>

              <div className="shipping-detail-row">
                <span>Courier</span>
                <strong>{selectedRecord.courier}</strong>
              </div>

              <div className="shipping-detail-row">
                <span>Origin</span>
                <strong>{selectedRecord.origin}</strong>
              </div>

              <div className="shipping-detail-row">
                <span>Destination</span>
                <strong>{selectedRecord.destination}</strong>
              </div>

              <div className="shipping-detail-row">
                <span>Ship Date</span>
                <strong>{selectedRecord.date}</strong>
              </div>

              <div className="shipping-status-update">
                <label htmlFor="shipping-status">Update Shipment Status</label>

                <select
                  id="shipping-status"
                  value={selectedRecord.status}
                  onChange={(e) =>
                    updateStatus(selectedRecord.id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>
            </div>

            <div className="shipping-modal-footer">
              <button onClick={() => setSelectedRecord(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingRecords;
