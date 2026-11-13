
import {
  useState,
} from "react";

import {
  CreditCard,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import "./SubscriptionOverview.css";

function SubscriptionOverview() {
  const [subscriptions] = useState([
    {
      id: "SUB-1001",
      customer: "John Smith",
      plan: "Premium",
      amount: "₱999",
      status: "Active",
      date: "Nov 12, 2026",
    },
    {
      id: "SUB-1002",
      customer: "Sarah Johnson",
      plan: "Basic",
      amount: "₱299",
      status: "Active",
      date: "Nov 11, 2026",
    },
    {
      id: "SUB-1003",
      customer: "Michael Brown",
      plan: "Enterprise",
      amount: "₱2,499",
      status: "Pending",
      date: "Nov 10, 2026",
    },
    {
      id: "SUB-1004",
      customer: "Emily Davis",
      plan: "Premium",
      amount: "₱999",
      status: "Cancelled",
      date: "Nov 09, 2026",
    },
    {
      id: "SUB-1005",
      customer: "David Wilson",
      plan: "Basic",
      amount: "₱299",
      status: "Active",
      date: "Nov 08, 2026",
    },
  ]);

  const stats = [
    {
      title: "Total Subscriptions",
      value: "2,486",
      change: "+12.5%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Subscriptions",
      value: "2,148",
      change: "+8.2%",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Monthly Recurring Revenue",
      value: "₱485,250",
      change: "+15.3%",
      icon: CreditCard,
      color: "purple",
    },
    {
      title: "Pending Subscriptions",
      value: "86",
      change: "+3.4%",
      icon: Clock,
      color: "orange",
    },
  ];

  const plans = [
    { name: "Basic", subscribers: 842, percentage: 39 },
    { name: "Premium", subscribers: 986, percentage: 46 },
    { name: "Enterprise", subscribers: 320, percentage: 15 },
  ];

  return (
    <div className="subscription-overview">
      <div className="subscription-heading">
        <div>
          <h1>Subscription Overview</h1>
          <p>Monitor subscriptions, plans, and recurring revenue.</p>
        </div>

        <button className="subscription-date-button">
          November 2026
        </button>
      </div>

      <div className="subscription-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div className="subscription-stat-card" key={index}>
              <div className="subscription-stat-top">
                <div className={`subscription-stat-icon ${stat.color}`}>
                  <Icon size={22} />
                </div>

                <span className="subscription-stat-change">
                  <ArrowUpRight size={15} />
                  {stat.change}
                </span>
              </div>

              <h2>{stat.value}</h2>
              <p>{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="subscription-content-grid">
        <div className="subscription-panel">
          <div className="subscription-panel-heading">
            <div>
              <h2>Subscription Plan Distribution</h2>
              <p>Subscribers grouped by subscription plan</p>
            </div>
          </div>

          <div className="subscription-plan-list">
            {plans.map((plan) => (
              <div className="subscription-plan-item" key={plan.name}>
                <div className="subscription-plan-info">
                  <strong>{plan.name}</strong>
                  <span>{plan.subscribers.toLocaleString()} subscribers</span>
                </div>

                <div className="subscription-progress">
                  <div
                    className={`subscription-progress-fill ${plan.name.toLowerCase()}`}
                    style={{ width: `${plan.percentage}%` }}
                  />
                </div>

                <span className="subscription-plan-percentage">
                  {plan.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="subscription-panel">
          <div className="subscription-panel-heading">
            <div>
              <h2>Subscription Summary</h2>
              <p>Current subscription performance</p>
            </div>
          </div>

          <div className="subscription-summary">
            <div>
              <span>Active Rate</span>
              <strong>86.4%</strong>
            </div>

            <div>
              <span>Renewal Rate</span>
              <strong>92.8%</strong>
            </div>

            <div>
              <span>Cancelled</span>
              <strong>252</strong>
            </div>

            <div>
              <span>Expired</span>
              <strong>86</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="subscription-panel subscription-table-panel">
        <div className="subscription-panel-heading">
          <div>
            <h2>Recent Subscriptions</h2>
            <p>Latest customer subscription activities</p>
          </div>
        </div>

        <div className="subscription-table-wrapper">
          <table className="subscription-table">
            <thead>
              <tr>
                <th>Subscription ID</th>
                <th>Customer</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td>{subscription.id}</td>
                  <td>{subscription.customer}</td>
                  <td>{subscription.plan}</td>
                  <td>{subscription.amount}</td>
                  <td>{subscription.date}</td>
                  <td>
                    <span
                      className={`subscription-status ${subscription.status.toLowerCase()}`}
                    >
                      {subscription.status}
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

export default SubscriptionOverview;
