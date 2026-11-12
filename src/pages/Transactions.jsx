
import { useState } from "react";

import {
  Search,
  Eye,
  Download,
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
  X,
} from "lucide-react";

import "./Transactions.css";

function Transactions() {
  const [transactions] = useState([
    {
      id: "PAY-1001",
      customer: "John Smith",
      email: "john.smith@email.com",
      date: "Nov 12, 2026",
      method: "Credit Card",
      amount: 12500,
      status: "Completed",
    },
    {
      id: "PAY-1002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      date: "Nov 12, 2026",
      method: "GCash",
      amount: 8500,
      status: "Pending",
    },
    {
      id: "PAY-1003",
      customer: "Michael Brown",
      email: "michael.b@email.com",
      date: "Nov 11, 2026",
      method: "Bank Transfer",
      amount: 15000,
      status: "Completed",
    },
    {
      id: "PAY-1004",
      customer: "Emily Davis",
      email: "emily.d@email.com",
      date: "Nov 11, 2026",
      method: "Maya",
      amount: 4200,
      status: "Failed",
    },
    {
      id: "PAY-1005",
      customer: "David Wilson",
      email: "david.w@email.com",
      date: "Nov 10, 2026",
      method: "Credit Card",
      amount: 9800,
      status: "Completed",
    },
    {
      id: "PAY-1006",
      customer: "Jessica Taylor",
      email: "jessica.t@email.com",
      date: "Nov 09, 2026",
      method: "GCash",
      amount: 6200,
      status: "Pending",
    },
    {
      id: "PAY-1007",
      customer: "Robert Garcia",
      email: "robert.g@email.com",
      date: "Nov 08, 2026",
      method: "Bank Transfer",
      amount: 11000,
      status: "Failed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(amount);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || transaction.status === statusFilter;

    const matchesMethod =
      methodFilter === "All" || transaction.method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const completedCount = transactions.filter(
    (transaction) => transaction.status === "Completed"
  ).length;

  const pendingCount = transactions.filter(
    (transaction) => transaction.status === "Pending"
  ).length;

  const failedCount = transactions.filter(
    (transaction) => transaction.status === "Failed"
  ).length;

  const totalAmount = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <div className="transactions-page">
      <div className="transactions-heading">
        <div>
          <h2>Transactions</h2>
          <p>View and monitor all payment transactions.</p>
        </div>

        <button className="transaction-export-btn">
          <Download size={17} />
          Export Records
        </button>
      </div>

      <div className="transaction-stats">
        <div className="transaction-stat-card">
          <div className="transaction-stat-icon blue">
            <Receipt size={21} />
          </div>
          <div>
            <p>Total Transactions</p>
            <h3>{transactions.length}</h3>
          </div>
        </div>

        <div className="transaction-stat-card">
          <div className="transaction-stat-icon green">
            <CheckCircle size={21} />
          </div>
          <div>
            <p>Completed</p>
            <h3>{completedCount}</h3>
          </div>
        </div>

        <div className="transaction-stat-card">
          <div className="transaction-stat-icon orange">
            <Clock size={21} />
          </div>
          <div>
            <p>Pending</p>
            <h3>{pendingCount}</h3>
          </div>
        </div>

        <div className="transaction-stat-card">
          <div className="transaction-stat-icon red">
            <XCircle size={21} />
          </div>
          <div>
            <p>Failed</p>
            <h3>{failedCount}</h3>
          </div>
        </div>
      </div>

      <div className="transactions-table-card">
        <div className="transactions-table-heading">
          <div>
            <h3>All Transactions</h3>
            <p>
              Total transaction value:{" "}
              <strong>{formatCurrency(totalAmount)}</strong>
            </p>
          </div>

          <span>{filteredTransactions.length} Records</span>
        </div>

        <div className="transaction-filters">
          <div className="transaction-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search transaction ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option value="All">All Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="GCash">GCash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Maya">Maya</option>
          </select>
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="transaction-id">{transaction.id}</td>
                    <td>{transaction.customer}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.method}</td>
                    <td className="transaction-amount">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td>
                      <span
                        className={`transaction-status ${transaction.status.toLowerCase()}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="transaction-view-btn"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="transaction-empty">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTransaction && (
        <div
          className="transaction-modal-overlay"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="transaction-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="transaction-modal-heading">
              <div>
                <h3>Transaction Details</h3>
                <p>{selectedTransaction.id}</p>
              </div>

              <button onClick={() => setSelectedTransaction(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="transaction-detail-list">
              <div>
                <span>Customer</span>
                <strong>{selectedTransaction.customer}</strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>{selectedTransaction.email}</strong>
              </div>

              <div>
                <span>Transaction Date</span>
                <strong>{selectedTransaction.date}</strong>
              </div>

              <div>
                <span>Payment Method</span>
                <strong>{selectedTransaction.method}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>
                  {formatCurrency(selectedTransaction.amount)}
                </strong>
              </div>

              <div>
                <span>Payment Status</span>
                <span
                  className={`transaction-status ${selectedTransaction.status.toLowerCase()}`}
                >
                  {selectedTransaction.status}
                </span>
              </div>
            </div>

            <button
              className="transaction-close-btn"
              onClick={() => setSelectedTransaction(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
