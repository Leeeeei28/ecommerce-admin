
import { useState } from "react";

import {
  Search,
  UserRound,
  Clock,
  MessageSquare,
  Send,
  Paperclip,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Headset,
} from "lucide-react";

import "./TicketManagement.css";

function TicketManagement() {
  const [tickets, setTickets] = useState([
    {
      id: "TCK-1001",
      customer: "John Smith",
      email: "johnsmith@email.com",
      subject: "Payment not reflected",
      priority: "High",
      status: "Open",
      agent: "Alex Morgan",
      category: "Payment",
      date: "Nov 10, 2026",
      description:
        "I completed my payment yesterday, but the transaction is still not appearing in my account. Please help me verify my payment.",
      messages: [
        {
          sender: "customer",
          name: "John Smith",
          message:
            "Hello, I completed my payment yesterday, but it is still not showing in my account.",
          time: "09:15 AM",
        },
        {
          sender: "agent",
          name: "Alex Morgan",
          message:
            "Hello John! Thank you for contacting support. Could you please provide your transaction reference number?",
          time: "09:32 AM",
        },
        {
          sender: "customer",
          name: "John Smith",
          message: "My reference number is TXN-2026-8821.",
          time: "10:05 AM",
        },
      ],
      notes: [
        {
          author: "Alex Morgan",
          text: "Waiting for payment verification from the Finance team.",
          time: "10:15 AM",
        },
      ],
      activities: [
        "Ticket created by John Smith",
        "Assigned to Alex Morgan",
        "Customer provided transaction reference",
      ],
    },
    {
      id: "TCK-1002",
      customer: "Maria Santos",
      email: "maria@email.com",
      subject: "Unable to access account",
      priority: "Medium",
      status: "In Progress",
      agent: "Sarah Lee",
      category: "Account",
      date: "Nov 10, 2026",
      description:
        "I cannot access my account even after resetting my password.",
      messages: [
        {
          sender: "customer",
          name: "Maria Santos",
          message: "I still cannot log in after resetting my password.",
          time: "08:30 AM",
        },
        {
          sender: "agent",
          name: "Sarah Lee",
          message: "We're checking your account access. Please allow us a moment.",
          time: "09:00 AM",
        },
      ],
      notes: [],
      activities: ["Ticket created by Maria Santos", "Assigned to Sarah Lee"],
    },
    {
      id: "TCK-1003",
      customer: "David Johnson",
      email: "david@email.com",
      subject: "Order delivery concern",
      priority: "Low",
      status: "Resolved",
      agent: "Alex Morgan",
      category: "Delivery",
      date: "Nov 09, 2026",
      description: "Customer requested an update regarding a delayed delivery.",
      messages: [
        {
          sender: "customer",
          name: "David Johnson",
          message: "Can I get an update on my delivery?",
          time: "11:00 AM",
        },
        {
          sender: "agent",
          name: "Alex Morgan",
          message: "Your package has been delivered. Thank you for waiting!",
          time: "01:20 PM",
        },
      ],
      notes: [],
      activities: ["Ticket created", "Delivery verified", "Ticket resolved"],
    },
  ]);

  const [selectedId, setSelectedId] = useState("TCK-1001");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [activeTab, setActiveTab] = useState("conversation");

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId);

  const agents = ["Alex Morgan", "Sarah Lee", "James Wilson", "Unassigned"];

  const filteredTickets = tickets.filter((ticket) =>
    `${ticket.id} ${ticket.customer} ${ticket.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const updateTicket = (field, value) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedId
          ? {
              ...ticket,
              [field]: value,
              activities: [
                `${field === "agent" ? "Assigned agent changed" : `${field} updated to ${value}`}`,
                ...ticket.activities,
              ],
            }
          : ticket
      )
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedId
          ? {
              ...ticket,
              messages: [
                ...ticket.messages,
                {
                  sender: "agent",
                  name: "Support Agent",
                  message: message.trim(),
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
              activities: ["Agent sent a customer reply", ...ticket.activities],
            }
          : ticket
      )
    );

    setMessage("");
  };

  const addInternalNote = (e) => {
    e.preventDefault();

    if (!internalNote.trim()) return;

    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedId
          ? {
              ...ticket,
              notes: [
                ...ticket.notes,
                {
                  author: "Support Agent",
                  text: internalNote.trim(),
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
              activities: ["Internal note added", ...ticket.activities],
            }
          : ticket
      )
    );

    setInternalNote("");
  };

  if (!selectedTicket) return null;

  return (
    <div className="ticket-management">

      <div className="management-heading">
        <div>
          <h2>Ticket Management</h2>
          <p>Handle customer concerns and manage support requests.</p>
        </div>

        <div className="management-heading-status">
          <Headset size={18} />
          Support Workspace
        </div>
      </div>

      <div className="management-layout">

        {/* Ticket List */}
        <aside className="management-ticket-list">
          <div className="ticket-list-heading">
            <h3>Support Tickets</h3>
            <span>{tickets.length}</span>
          </div>

          <div className="management-search">
            <Search size={16} />
            <input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="management-ticket-items">
            {filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                className={`management-ticket-item ${
                  selectedId === ticket.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedId(ticket.id);
                  setActiveTab("conversation");
                }}
              >
                <div className="ticket-item-top">
                  <strong>{ticket.id}</strong>
                  <span className={`ticket-list-priority ${ticket.priority.toLowerCase()}`}>
                    {ticket.priority}
                  </span>
                </div>

                <h4>{ticket.subject}</h4>
                <p>{ticket.customer}</p>

                <div className="ticket-item-bottom">
                  <span>{ticket.status}</span>
                  <span>{ticket.date}</span>
                </div>
              </button>
            ))}

            {filteredTickets.length === 0 && (
              <p className="management-empty">No tickets found.</p>
            )}
          </div>
        </aside>

        {/* Main Ticket Workspace */}
        <main className="management-workspace">

          <div className="workspace-ticket-header">
            <div>
              <span className="workspace-ticket-id">{selectedTicket.id}</span>
              <h3>{selectedTicket.subject}</h3>
              <p>
                {selectedTicket.customer} · {selectedTicket.email}
              </p>
            </div>

            <span className={`workspace-status ${selectedTicket.status.toLowerCase().replace(" ", "-")}`}>
              {selectedTicket.status}
            </span>
          </div>

          {/* Ticket Controls */}
          <div className="ticket-control-grid">

            <div className="ticket-control">
              <label>Assigned Agent</label>
              <div className="control-with-icon">
                <UserRound size={16} />
                <select
                  value={selectedTicket.agent}
                  onChange={(e) => updateTicket("agent", e.target.value)}
                >
                  {agents.map((agent) => (
                    <option key={agent}>{agent}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ticket-control">
              <label>Priority</label>
              <div className="control-with-icon">
                {selectedTicket.priority === "High" ? (
                  <ArrowUp size={16} />
                ) : selectedTicket.priority === "Low" ? (
                  <ArrowDown size={16} />
                ) : (
                  <Minus size={16} />
                )}

                <select
                  value={selectedTicket.priority}
                  onChange={(e) => updateTicket("priority", e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="ticket-control">
              <label>Ticket Status</label>
              <div className="control-with-icon">
                <CheckCircle size={16} />
                <select
                  value={selectedTicket.status}
                  onChange={(e) => updateTicket("status", e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>

            <div className="ticket-control">
              <label>Category</label>
              <div className="control-with-icon">
                <AlertCircle size={16} />
                <strong>{selectedTicket.category}</strong>
              </div>
            </div>

          </div>

          {/* Customer Description */}
          <div className="customer-issue-box">
            <div className="issue-box-heading">
              <AlertCircle size={17} />
              <strong>Customer Issue</strong>
            </div>
            <p>{selectedTicket.description}</p>
          </div>

          {/* Tabs */}
          <div className="workspace-tabs">
            <button
              className={activeTab === "conversation" ? "active" : ""}
              onClick={() => setActiveTab("conversation")}
            >
              <MessageSquare size={16} />
              Conversation
            </button>

            <button
              className={activeTab === "notes" ? "active" : ""}
              onClick={() => setActiveTab("notes")}
            >
              <AlertCircle size={16} />
              Internal Notes
            </button>

            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => setActiveTab("activity")}
            >
              <Clock size={16} />
              Activity
            </button>
          </div>

          {/* Conversation */}
          {activeTab === "conversation" && (
            <div className="workspace-tab-content">
              <div className="conversation-messages">
                {selectedTicket.messages.map((item, index) => (
                  <div
                    key={index}
                    className={`conversation-message ${item.sender}`}
                  >
                    <div className="message-avatar">
                      {item.sender === "customer" ? (
                        <UserRound size={17} />
                      ) : (
                        <Headset size={17} />
                      )}
                    </div>

                    <div className="message-body">
                      <div className="message-meta">
                        <strong>{item.name}</strong>
                        <span>{item.time}</span>
                      </div>
                      <p>{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form className="message-composer" onSubmit={sendMessage}>
                <textarea
                  rows="3"
                  placeholder="Write a reply to the customer..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <div className="composer-actions">
                  <button type="button" className="attachment-btn" disabled title="Attachments will be added later">
                    <Paperclip size={17} />
                  </button>

                  <button type="submit" className="send-reply-btn" disabled={!message.trim()}>
                    <Send size={15} />
                    Send Reply
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Internal Notes */}
          {activeTab === "notes" && (
            <div className="workspace-tab-content">
              <form className="internal-note-form" onSubmit={addInternalNote}>
                <label>Internal Note</label>
                <textarea
                  rows="4"
                  placeholder="Write a note for other support agents..."
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                />

                <button type="submit" disabled={!internalNote.trim()}>
                  Add Internal Note
                </button>
              </form>

              <div className="internal-note-list">
                {selectedTicket.notes.length > 0 ? (
                  selectedTicket.notes.map((note, index) => (
                    <div className="internal-note-item" key={index}>
                      <div>
                        <strong>{note.author}</strong>
                        <span>{note.time}</span>
                      </div>
                      <p>{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="management-empty">No internal notes yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          {activeTab === "activity" && (
            <div className="workspace-tab-content">
              <div className="ticket-activity-list">
                {selectedTicket.activities.map((activity, index) => (
                  <div className="ticket-activity-item" key={index}>
                    <span className="activity-timeline-icon">
                      <Clock size={14} />
                    </span>
                    <div>
                      <p>{activity}</p>
                      <span>Recorded in this session</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="workspace-footer">
            <Clock size={15} />
            Created on {selectedTicket.date}
          </div>

        </main>
      </div>
    </div>
  );
}

export default TicketManagement;
