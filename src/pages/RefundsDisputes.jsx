
import { useState } from "react";

import {
  Search,
  Eye,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  X,
} from "lucide-react";

import "./RefundsDisputes.css";

function RefundsDisputes() {
  const [requests, setRequests] = useState([
    {
      id: "REF-1001",
      transactionId: "PAY-1001",
      customer: "John Smith",
      type: "Refund",
      reason: "Duplicate payment",
      amount: 12500,
      date: "Nov 12, 2026",
      status: "Pending",
    },
    {
      id: "REF-1002",
      transactionId: "PAY-1003",
      customer: "Michael Brown",
      type: "Refund",
      reason: "Incorrect amount charged",
      amount: 5000,
      date: "Nov 11, 2026",
      status: "Approved",
    },
    {
      id: "DSP-1001",
      transactionId: "PAY-1004",
      customer: "Emily Davis",
      type: "Dispute",
      reason: "Payment not recognized",
      amount: 4200,
      date: "Nov 11, 2026",
      status: "Under Review",
    },
    {
      id: "REF-1003",
      transactionId: "PAY-1005",
      customer: "David Wilson",
      type: "Refund",
      reason: "Product cancellation",
      amount: 9800,
      date: "Nov 10, 2026",
      status: "Rejected",
    },
    {
      id: "DSP-1002",
      transactionId: "PAY-1007",
      customer: "Robert Garcia",
      type: "Dispute",
      reason: "Unauthorized transaction",
      amount: 11000,
      date: "Nov 09, 2026",
      status: "Pending",
    },
    {
      id: "REF-1004",
      transactionId: "PAY-1006",
      customer: "Jessica Taylor",
      type: "Refund",
      reason: "Service not received",
      amount: 6200,
      date: "Nov 08, 2026",
      status: "Completed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(amount);

  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
      )
    );

    setSelectedRequest((prev) =>
      prev?.id === id
        ? { ...prev, status: newStatus }
        : prev
    );
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All" || request.type === typeFilter;

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const refundCount = requests.filter(
    (request) => request.type === "Refund"
  ).length;

  const disputeCount = requests.filter(
    (request) => request.type === "Dispute"
  ).length;

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const reviewCount = requests.filter(
    (request) => request.status === "Under Review"
  ).length;

  return (
    <div className="refunds-page">
      <div className="refunds-heading">
        <div>
          <h2>Refunds & Disputes</h2>
          <p>Manage customer refund requests and payment disputes.</p>
        </div>
      </div>

      <div className="refunds-stats">
        <div className="refund-stat-card">
          <div className="refund-stat-icon blue">
            <RotateCcw size={21} />
          </div>
          <div>
            <p>Total Refund Requests</p>
            <h3>{refundCount}</h3>
          </div>
        </div>

        <div className="refund-stat-card">
          <div className="refund-stat-icon red">
            <AlertTriangle size={21} />
          </div>
          <div>
            <p>Total Disputes</p>
            <h3>{disputeCount}</h3>
          </div>
        </div>

        <div className="refund-stat-card">
          <div className="refund-stat-icon orange">
            <Clock size={21} />
          </div>
          <div>
            <p>Pending Requests</p>
            <h3>{pendingCount}</h3>
          </div>
        </div>

        <div className="refund-stat-card">
          <div className="refund-stat-icon purple">
            <Search size={21} />
          </div>
          <div>
            <p>Under Review</p>
            <h3>{reviewCount}</h3>
          </div>
        </div>
      </div>

      <div className="refunds-table-card">
        <div className="refunds-table-heading">
          <div>
            <h3>Refund & Dispute Records</h3>
            <p>Review and manage all customer requests.</p>
          </div>

          <span>{filteredRequests.length} Records</span>
        </div>

        <div className="refunds-filters">
          <div className="refunds-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Refund">Refund</option>
            <option value="Dispute">Dispute</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="refunds-table-wrapper">
          <table className="refunds-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Reason</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="refund-request-id">{request.id}</td>
                    <td>{request.customer}</td>
                    <td>{request.type}</td>
                    <td>{request.reason}</td>
                    <td className="refund-amount">
                      {formatCurrency(request.amount)}
                    </td>
                    <td>{request.date}</td>
                    <td>
                      <span
                        className={`refund-status ${request.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="refund-view-btn"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="refund-empty">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <div
          className="refund-modal-overlay"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="refund-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="refund-modal-heading">
              <div>
                <h3>Request Details</h3>
                <p>{selectedRequest.id}</p>
              </div>

              <button onClick={() => setSelectedRequest(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="refund-detail-list">
              <div>
                <span>Customer</span>
                <strong>{selectedRequest.customer}</strong>
              </div>

              <div>
                <span>Transaction ID</span>
                <strong>{selectedRequest.transactionId}</strong>
              </div>

              <div>
                <span>Request Type</span>
                <strong>{selectedRequest.type}</strong>
              </div>

              <div>
                <span>Reason</span>
                <strong>{selectedRequest.reason}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>{formatCurrency(selectedRequest.amount)}</strong>
              </div>

              <div>
                <span>Request Date</span>
                <strong>{selectedRequest.date}</strong>
              </div>

              <div>
                <span>Current Status</span>
                <span
                  className={`refund-status ${selectedRequest.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            <div className="refund-status-actions">
              <label>Update Request Status</label>

              <select
                value={selectedRequest.status}
                onChange={(e) =>
                  updateStatus(selectedRequest.id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              className="refund-close-btn"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RefundsDisputes;
