
import { useMemo, useState } from "react";
import {
  Search,
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  X,
} from "lucide-react";

import "./PayoutsSettlements.css";

function PayoutsSettlements() {
  const [payouts, setPayouts] = useState([
    {
      id: "PAY-2001",
      recipient: "John Smith",
      method: "Bank Transfer",
      amount: 12500,
      date: "Nov 12, 2026",
      status: "Completed",
      reference: "BNK-874521",
    },
    {
      id: "PAY-2002",
      recipient: "Sarah Johnson",
      method: "GCash",
      amount: 8750,
      date: "Nov 12, 2026",
      status: "Pending",
      reference: "GCS-652314",
    },
    {
      id: "PAY-2003",
      recipient: "Michael Brown",
      method: "Bank Transfer",
      amount: 15800,
      date: "Nov 11, 2026",
      status: "Processing",
      reference: "BNK-963852",
    },
    {
      id: "PAY-2004",
      recipient: "Emily Davis",
      method: "Maya",
      amount: 6200,
      date: "Nov 10, 2026",
      status: "Failed",
      reference: "MYA-741258",
    },
    {
      id: "PAY-2005",
      recipient: "David Wilson",
      method: "Bank Transfer",
      amount: 19400,
      date: "Nov 09, 2026",
      status: "Completed",
      reference: "BNK-159753",
    },
    {
      id: "PAY-2006",
      recipient: "Jessica Garcia",
      method: "GCash",
      amount: 5400,
      date: "Nov 08, 2026",
      status: "Pending",
      reference: "GCS-357951",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayout, setSelectedPayout] = useState(null);

  const filteredPayouts = useMemo(() => {
    return payouts.filter((payout) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        payout.id.toLowerCase().includes(searchValue) ||
        payout.recipient.toLowerCase().includes(searchValue) ||
        payout.reference.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || payout.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payouts, search, statusFilter]);

  const completed = payouts.filter(
    (payout) => payout.status === "Completed"
  );

  const pending = payouts.filter(
    (payout) => payout.status === "Pending"
  );

  const processing = payouts.filter(
    (payout) => payout.status === "Processing"
  );

  const totalPaid = completed.reduce(
    (total, payout) => total + payout.amount,
    0
  );

  const pendingAmount = pending.reduce(
    (total, payout) => total + payout.amount,
    0
  );

  const updateStatus = (id, newStatus) => {
    setPayouts((currentPayouts) =>
      currentPayouts.map((payout) =>
        payout.id === id
          ? { ...payout, status: newStatus }
          : payout
      )
    );

    setSelectedPayout((current) =>
      current && current.id === id
        ? { ...current, status: newStatus }
        : current
    );
  };

  const formatCurrency = (amount) =>
    `₱${amount.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="payouts-settlements">
      <div className="payouts-heading">
        <div>
          <h1>Payouts & Settlements</h1>
          <p>Monitor commission payouts and settlement transactions.</p>
        </div>
      </div>

      <div className="payouts-stats">
        <div className="payout-stat-card">
          <div className="payout-stat-icon blue">
            <Wallet size={22} />
          </div>
          <h2>{formatCurrency(totalPaid)}</h2>
          <p>Total Paid</p>
        </div>

        <div className="payout-stat-card">
          <div className="payout-stat-icon green">
            <CheckCircle size={22} />
          </div>
          <h2>{completed.length}</h2>
          <p>Completed Payouts</p>
        </div>

        <div className="payout-stat-card">
          <div className="payout-stat-icon orange">
            <Clock size={22} />
          </div>
          <h2>{formatCurrency(pendingAmount)}</h2>
          <p>Pending Amount</p>
        </div>

        <div className="payout-stat-card">
          <div className="payout-stat-icon purple">
            <AlertCircle size={22} />
          </div>
          <h2>{processing.length}</h2>
          <p>Processing Payouts</p>
        </div>
      </div>

      <div className="payouts-panel">
        <div className="payouts-panel-heading">
          <div>
            <h2>Payout Records</h2>
            <p>Review and manage recipient payout transactions.</p>
          </div>
        </div>

        <div className="payouts-filters">
          <div className="payouts-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search payout ID, recipient, or reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="payouts-table-wrapper">
          <table className="payouts-table">
            <thead>
              <tr>
                <th>Payout ID</th>
                <th>Recipient</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayouts.length > 0 ? (
                filteredPayouts.map((payout) => (
                  <tr key={payout.id}>
                    <td>{payout.id}</td>
                    <td>{payout.recipient}</td>
                    <td>{payout.method}</td>
                    <td>{formatCurrency(payout.amount)}</td>
                    <td>{payout.date}</td>
                    <td>
                      <span
                        className={`payout-status ${payout.status.toLowerCase()}`}
                      >
                        {payout.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="payout-view-button"
                        title="View payout details"
                        onClick={() => setSelectedPayout(payout)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="payout-empty">
                    No payout records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPayout && (
        <div
          className="payout-modal-overlay"
          onClick={() => setSelectedPayout(null)}
        >
          <div
            className="payout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="payout-modal-heading">
              <div>
                <h2>Payout Details</h2>
                <p>{selectedPayout.id}</p>
              </div>

              <button
                className="payout-close-button"
                onClick={() => setSelectedPayout(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="payout-details">
              <div>
                <span>Recipient</span>
                <strong>{selectedPayout.recipient}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>{formatCurrency(selectedPayout.amount)}</strong>
              </div>

              <div>
                <span>Payment Method</span>
                <strong>{selectedPayout.method}</strong>
              </div>

              <div>
                <span>Reference Number</span>
                <strong>{selectedPayout.reference}</strong>
              </div>

              <div>
                <span>Payout Date</span>
                <strong>{selectedPayout.date}</strong>
              </div>

              <div>
                <span>Current Status</span>
                <strong>{selectedPayout.status}</strong>
              </div>
            </div>

            <div className="payout-status-update">
              <label>Update Payout Status</label>
              <select
                value={selectedPayout.status}
                onChange={(e) =>
                  updateStatus(selectedPayout.id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div className="payout-modal-actions">
              <button onClick={() => setSelectedPayout(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PayoutsSettlements;
