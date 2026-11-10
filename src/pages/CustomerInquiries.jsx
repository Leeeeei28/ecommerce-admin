
import { useState } from "react";

import {
  Search,
  MessageSquare,
  UserRound,
  Clock,
  Send,
  Eye,
  CheckCircle,
  HelpCircle,
  CreditCard,
  Truck,
  Settings,
} from "lucide-react";

import "./CustomerInquiries.css";

function CustomerInquiries() {
  const [inquiries, setInquiries] = useState([
    {
      id: "INQ-1001",
      customer: "Emily Carter",
      email: "emily@email.com",
      subject: "How can I upgrade my subscription?",
      category: "Subscription",
      status: "Pending",
      agent: "Alex Morgan",
      date: "Nov 10, 2026",
      message:
        "Hello! I would like to upgrade my current subscription plan. Can you explain the available options?",
      replies: [
        {
          sender: "customer",
          name: "Emily Carter",
          message:
            "Hello! I would like to upgrade my current subscription plan. Can you explain the available options?",
          time: "09:15 AM",
        },
      ],
      history: ["Inquiry submitted by Emily Carter"],
    },
    {
      id: "INQ-1002",
      customer: "Michael Brown",
      email: "michael@email.com",
      subject: "Payment methods available",
      category: "Payment",
      status: "In Progress",
      agent: "Sarah Lee",
      date: "Nov 10, 2026",
      message:
        "I want to know which payment methods are currently accepted on your platform.",
      replies: [
        {
          sender: "customer",
          name: "Michael Brown",
          message:
            "I want to know which payment methods are currently accepted on your platform.",
          time: "08:40 AM",
        },
        {
          sender: "agent",
          name: "Sarah Lee",
          message:
            "Hello Michael! We currently support several payment options. I'll send you the complete list shortly.",
          time: "09:10 AM",
        },
      ],
      history: ["Inquiry submitted", "Assigned to Sarah Lee"],
    },
    {
      id: "INQ-1003",
      customer: "Sophia Wilson",
      email: "sophia@email.com",
      subject: "Delivery coverage in my area",
      category: "Delivery",
      status: "Resolved",
      agent: "James Wilson",
      date: "Nov 09, 2026",
      message:
        "I would like to confirm whether your delivery service is available in my location.",
      replies: [
        {
          sender: "customer",
          name: "Sophia Wilson",
          message: "Do you deliver to my area?",
          time: "10:00 AM",
        },
        {
          sender: "agent",
          name: "James Wilson",
          message:
            "Yes! Your location is within our current delivery coverage.",
          time: "10:30 AM",
        },
      ],
      history: ["Inquiry submitted", "Assigned to James Wilson", "Inquiry resolved"],
    },
    {
      id: "INQ-1004",
      customer: "Daniel Garcia",
      email: "daniel@email.com",
      subject: "Account profile update",
      category: "Account",
      status: "Pending",
      agent: "Unassigned",
      date: "Nov 09, 2026",
      message:
        "How can I change the email address connected to my account?",
      replies: [
        {
          sender: "customer",
          name: "Daniel Garcia",
          message:
            "How can I change the email address connected to my account?",
          time: "02:15 PM",
        },
      ],
      history: ["Inquiry submitted by Daniel Garcia"],
    },
  ]);

  const [selectedId, setSelectedId] = useState("INQ-1001");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reply, setReply] = useState("");

  const selectedInquiry = inquiries.find(
    (inquiry) => inquiry.id === selectedId
  );

  const agents = [
    "Unassigned",
    "Alex Morgan",
    "Sarah Lee",
    "James Wilson",
  ];

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch = `${inquiry.id} ${inquiry.customer} ${inquiry.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || inquiry.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || inquiry.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const updateInquiry = (field, value) => {
    setInquiries((previous) =>
      previous.map((inquiry) =>
        inquiry.id === selectedId
          ? {
              ...inquiry,
              [field]: value,
              history: [
                `${field === "agent" ? "Assigned agent changed to" : `${field} changed to`} ${value}`,
                ...inquiry.history,
              ],
            }
          : inquiry
      )
    );
  };

  const sendReply = (e) => {
    e.preventDefault();

    if (!reply.trim()) return;

    setInquiries((previous) =>
      previous.map((inquiry) =>
        inquiry.id === selectedId
          ? {
              ...inquiry,
              replies: [
                ...inquiry.replies,
                {
                  sender: "agent",
                  name: "Support Agent",
                  message: reply.trim(),
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
              history: ["Support agent sent a reply", ...inquiry.history],
            }
          : inquiry
      )
    );

    setReply("");
  };

  const getCategoryIcon = (category) => {
    if (category === "Payment") return CreditCard;
    if (category === "Delivery") return Truck;
    if (category === "Account") return Settings;
    if (category === "Subscription") return UserRound;
    return HelpCircle;
  };

  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter(
    (item) => item.status === "Pending"
  ).length;
  const inProgressInquiries = inquiries.filter(
    (item) => item.status === "In Progress"
  ).length;
  const resolvedInquiries = inquiries.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <div className="customer-inquiries">

      {/* Page Heading */}
      <div className="inquiries-heading">
        <div>
          <h2>Customer Inquiries</h2>
          <p>Manage customer questions and provide assistance.</p>
        </div>

        <div className="inquiries-heading-label">
          <MessageSquare size={18} />
          Inquiry Center
        </div>
      </div>

      {/* Statistics */}
      <div className="inquiries-stats">

        <div className="inquiry-stat-card">
          <div className="inquiry-stat-icon blue">
            <MessageSquare size={20} />
          </div>
          <div>
            <p>Total Inquiries</p>
            <h3>{totalInquiries}</h3>
          </div>
        </div>

        <div className="inquiry-stat-card">
          <div className="inquiry-stat-icon orange">
            <Clock size={20} />
          </div>
          <div>
            <p>Pending</p>
            <h3>{pendingInquiries}</h3>
          </div>
        </div>

        <div className="inquiry-stat-card">
          <div className="inquiry-stat-icon purple">
            <HelpCircle size={20} />
          </div>
          <div>
            <p>In Progress</p>
            <h3>{inProgressInquiries}</h3>
          </div>
        </div>

        <div className="inquiry-stat-card">
          <div className="inquiry-stat-icon green">
            <CheckCircle size={20} />
          </div>
          <div>
            <p>Resolved</p>
            <h3>{resolvedInquiries}</h3>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="inquiries-layout">

        {/* Inquiry List */}
        <section className="inquiries-list-panel">

          <div className="inquiries-list-heading">
            <h3>Inquiry List</h3>
            <span>{filteredInquiries.length} Results</span>
          </div>

          <div className="inquiries-filters">

            <div className="inquiries-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Subscription">Subscription</option>
              <option value="Payment">Payment</option>
              <option value="Delivery">Delivery</option>
              <option value="Account">Account</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

          </div>

          <div className="inquiry-table-wrapper">
            <table className="inquiry-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredInquiries.map((inquiry) => {
                  const CategoryIcon = getCategoryIcon(inquiry.category);

                  return (
                    <tr
                      key={inquiry.id}
                      className={
                        selectedId === inquiry.id ? "selected-inquiry-row" : ""
                      }
                    >
                      <td>
                        <strong>{inquiry.customer}</strong>
                        <span>{inquiry.id}</span>
                      </td>

                      <td>{inquiry.subject}</td>

                      <td>
                        <span className="inquiry-category">
                          <CategoryIcon size={14} />
                          {inquiry.category}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`inquiry-status ${inquiry.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {inquiry.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="inquiry-view-btn"
                          onClick={() => setSelectedId(inquiry.id)}
                          title="View inquiry"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="inquiry-empty">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </section>

        {/* Inquiry Details */}
        {selectedInquiry && (
          <section className="inquiry-details-panel">

            <div className="inquiry-details-heading">
              <div>
                <span>{selectedInquiry.id}</span>
                <h3>Inquiry Details</h3>
              </div>

              <span
                className={`inquiry-status ${selectedInquiry.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {selectedInquiry.status}
              </span>
            </div>

            <div className="inquiry-customer-info">
              <div className="inquiry-customer-avatar">
                <UserRound size={22} />
              </div>

              <div>
                <strong>{selectedInquiry.customer}</strong>
                <p>{selectedInquiry.email}</p>
              </div>
            </div>

            <div className="inquiry-subject-box">
              <label>Subject</label>
              <h4>{selectedInquiry.subject}</h4>

              <label>Customer Message</label>
              <p>{selectedInquiry.message}</p>

              <span>Submitted: {selectedInquiry.date}</span>
            </div>

            <div className="inquiry-assignment">
              <label>Assigned Agent</label>
              <select
                value={selectedInquiry.agent}
                onChange={(e) => updateInquiry("agent", e.target.value)}
              >
                {agents.map((agent) => (
                  <option key={agent}>{agent}</option>
                ))}
              </select>

              <label>Inquiry Status</label>
              <select
                value={selectedInquiry.status}
                onChange={(e) => updateInquiry("status", e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            {/* Conversation */}
            <div className="inquiry-conversation-heading">
              <MessageSquare size={17} />
              <h4>Conversation History</h4>
            </div>

            <div className="inquiry-replies">
              {selectedInquiry.replies.map((item, index) => (
                <div
                  className={`inquiry-reply ${item.sender}`}
                  key={index}
                >
                  <div className="inquiry-reply-meta">
                    <strong>{item.name}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.message}</p>
                </div>
              ))}
            </div>

            <form className="inquiry-reply-form" onSubmit={sendReply}>
              <textarea
                rows="3"
                placeholder="Write your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              <button type="submit" disabled={!reply.trim()}>
                <Send size={15} />
                Send Reply
              </button>
            </form>

            {/* History */}
            <div className="inquiry-history">
              <h4>Inquiry Activity</h4>

              {selectedInquiry.history.map((activity, index) => (
                <div className="inquiry-history-item" key={index}>
                  <span>
                    <Clock size={13} />
                  </span>
                  <p>{activity}</p>
                </div>
              ))}
            </div>

          </section>
        )}

      </div>
    </div>
  );
}

export default CustomerInquiries;
