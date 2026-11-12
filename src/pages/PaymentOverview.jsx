
import {
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";

import "./PaymentOverview.css";

function PaymentOverview() {
  const paymentStats = [
    {
      title: "Total Payments",
      value: "₱485,250",
      change: "+12.5%",
      icon: Wallet,
      color: "blue",
    },
    {
      title: "Completed Payments",
      value: "1,248",
      change: "+8.2%",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Pending Payments",
      value: "86",
      change: "-2.4%",
      icon: Clock,
      color: "orange",
    },
    {
      title: "Failed Payments",
      value: "24",
      change: "+1.8%",
      icon: XCircle,
      color: "red",
    },
  ];

  const transactions = [
    {
      id: "PAY-1001",
      customer: "John Smith",
      date: "Nov 12, 2026",
      method: "Credit Card",
      amount: 12500,
      status: "Completed",
    },
    {
      id: "PAY-1002",
      customer: "Sarah Johnson",
      date: "Nov 12, 2026",
      method: "GCash",
      amount: 8500,
      status: "Pending",
    },
    {
      id: "PAY-1003",
      customer: "Michael Brown",
      date: "Nov 11, 2026",
      method: "Bank Transfer",
      amount: 15000,
      status: "Completed",
    },
    {
      id: "PAY-1004",
      customer: "Emily Davis",
      date: "Nov 11, 2026",
      method: "Maya",
      amount: 4200,
      status: "Failed",
    },
    {
      id: "PAY-1005",
      customer: "David Wilson",
      date: "Nov 10, 2026",
      method: "Credit Card",
      amount: 9800,
      status: "Completed",
    },
  ];

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="payment-overview">
      <div className="payment-page-heading">
        <div>
          <h2>Payment Overview</h2>
          <p>Monitor payment activities and transaction performance.</p>
        </div>

        <button className="payment-date-button">
          <CreditCard size={17} />
          November 2026
        </button>
      </div>

      <div className="payment-stats-grid">
        {paymentStats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith("+");

          return (
            <div className="payment-stat-card" key={stat.title}>
              <div className="payment-stat-top">
                <div className={`payment-stat-icon ${stat.color}`}>
                  <Icon size={21} />
                </div>

                <span className={isPositive ? "positive" : "negative"}>
                  {isPositive ? (
                    <ArrowUpRight size={15} />
                  ) : (
                    <ArrowDownRight size={15} />
                  )}
                  {stat.change}
                </span>
              </div>

              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="payment-content-grid">
        <div className="payment-status-card">
          <div className="payment-section-heading">
            <div>
              <h3>Payment Status Overview</h3>
              <p>Current payment distribution</p>
            </div>
          </div>

          <div className="payment-status-list">
            <div className="payment-status-item">
              <div>
                <span className="status-dot completed-dot"></span>
                <span>Completed</span>
              </div>
              <strong>1,248</strong>
            </div>

            <div className="payment-progress">
              <div className="progress-completed"></div>
            </div>

            <div className="payment-status-item">
              <div>
                <span className="status-dot pending-dot"></span>
                <span>Pending</span>
              </div>
              <strong>86</strong>
            </div>

            <div className="payment-progress">
              <div className="progress-pending"></div>
            </div>

            <div className="payment-status-item">
              <div>
                <span className="status-dot failed-dot"></span>
                <span>Failed</span>
              </div>
              <strong>24</strong>
            </div>

            <div className="payment-progress">
              <div className="progress-failed"></div>
            </div>
          </div>
        </div>

        <div className="payment-method-card">
          <div className="payment-section-heading">
            <div>
              <h3>Payment Methods</h3>
              <p>Popular payment channels</p>
            </div>
          </div>

          <div className="payment-method-list">
            <div className="payment-method-item">
              <div className="method-icon blue">
                <CreditCard size={19} />
              </div>
              <div>
                <strong>Credit Card</strong>
                <span>520 transactions</span>
              </div>
              <strong>42%</strong>
            </div>

            <div className="payment-method-item">
              <div className="method-icon green">
                <Wallet size={19} />
              </div>
              <div>
                <strong>GCash</strong>
                <span>390 transactions</span>
              </div>
              <strong>31%</strong>
            </div>

            <div className="payment-method-item">
              <div className="method-icon orange">
                <CreditCard size={19} />
              </div>
              <div>
                <strong>Bank Transfer</strong>
                <span>220 transactions</span>
              </div>
              <strong>18%</strong>
            </div>

            <div className="payment-method-item">
              <div className="method-icon purple">
                <Wallet size={19} />
              </div>
              <div>
                <strong>Maya</strong>
                <span>118 transactions</span>
              </div>
              <strong>9%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-transactions-card">
        <div className="payment-section-heading">
          <div>
            <h3>Recent Transactions</h3>
            <p>Latest payment activities</p>
          </div>

          <span className="payment-record-count">5 Records</span>
        </div>

        <div className="payment-table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="payment-id">{transaction.id}</td>
                  <td>{transaction.customer}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.method}</td>
                  <td className="payment-amount">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td>
                    <span
                      className={`payment-status-badge ${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
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

export default PaymentOverview;
