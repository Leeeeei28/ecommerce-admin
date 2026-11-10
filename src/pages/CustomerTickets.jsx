
import { useState } from "react";

import {
  Search,
  Plus,
  Eye,
  Filter,
  Ticket,
  X,
} from "lucide-react";

import "./CustomerTickets.css";

function CustomerTickets() {
  const [tickets, setTickets] = useState([
    {
      id: "TCK-1001",
      customer: "John Smith",
      email: "johnsmith@email.com",
      subject: "Payment not reflected",
      category: "Payment",
      priority: "High",
      status: "Open",
      agent: "Alex Morgan",
      date: "Nov 10, 2026",
      description: "Customer completed a payment, but the transaction is not appearing in their account.",
    },
    {
      id: "TCK-1002",
      customer: "Maria Santos",
      email: "maria@email.com",
      subject: "Unable to access account",
      category: "Account",
      priority: "Medium",
      status: "In Progress",
      agent: "Sarah Lee",
      date: "Nov 10, 2026",
      description: "Customer is unable to log in after resetting their password.",
    },
    {
      id: "TCK-1003",
      customer: "David Johnson",
      email: "david@email.com",
      subject: "Order delivery concern",
      category: "Delivery",
      priority: "Low",
      status: "Resolved",
      agent: "Alex Morgan",
      date: "Nov 09, 2026",
      description: "Customer requested an update regarding their delayed delivery.",
    },
    {
      id: "TCK-1004",
      customer: "Sarah Wilson",
      email: "sarah@email.com",
      subject: "Refund request",
      category: "Refund",
      priority: "High",
      status: "Open",
      agent: "Unassigned",
      date: "Nov 09, 2026",
      description: "Customer requested a refund for a cancelled order.",
    },
    {
      id: "TCK-1005",
      customer: "Michael Brown",
      email: "michael@email.com",
      subject: "Subscription renewal issue",
      category: "Subscription",
      priority: "Medium",
      status: "In Progress",
      agent: "Sarah Lee",
      date: "Nov 08, 2026",
      description: "Customer reported an issue with their subscription renewal.",
    },
    {
      id: "TCK-1006",
      customer: "Emily Davis",
      email: "emily@email.com",
      subject: "Incorrect billing amount",
      category: "Billing",
      priority: "High",
      status: "Closed",
      agent: "James Wilson",
      date: "Nov 07, 2026",
      description: "Customer questioned an incorrect billing amount.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newTicket, setNewTicket] = useState({
    customer: "",
    email: "",
    subject: "",
    category: "General",
    priority: "Medium",
    description: "",
  });

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();

    const ticket = {
      ...newTicket,
      id: `TCK-${1001 + tickets.length}`,
      status: "Open",
      agent: "Unassigned",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setTickets([ticket, ...tickets]);

    setNewTicket({
      customer: "",
      email: "",
      subject: "",
      category: "General",
      priority: "Medium",
      description: "",
    });

    setShowCreateForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );

    setSelectedTicket((previousTicket) =>
      previousTicket?.id === id
        ? { ...previousTicket, status: newStatus }
        : previousTicket
    );
  };

  return (
    <div className="tickets-page">

      {/* Heading */}
      <div className="tickets-heading">
        <div>
          <h2>Customer Tickets</h2>
          <p>Manage and monitor all customer support tickets.</p>
        </div>

        <button
          className="new-ticket-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus size={17} />
          Create Ticket
        </button>
      </div>

      {/* Ticket Statistics */}
      <div className="ticket-summary-grid">
        <div className="ticket-summary-card">
          <Ticket size={21} />
          <div>
            <span>Total Tickets</span>
            <h3>{tickets.length}</h3>
          </div>
        </div>

        <div className="ticket-summary-card open-summary">
          <div>
            <span>Open</span>
            <h3>{tickets.filter((t) => t.status === "Open").length}</h3>
          </div>
        </div>

        <div className="ticket-summary-card progress-summary">
          <div>
            <span>In Progress</span>
            <h3>{tickets.filter((t) => t.status === "In Progress").length}</h3>
          </div>
        </div>

        <div className="ticket-summary-card resolved-summary">
          <div>
            <span>Resolved</span>
            <h3>{tickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length}</h3>
          </div>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="tickets-panel">

        <div className="tickets-panel-heading">
          <div>
            <h3>All Support Tickets</h3>
            <p>{filteredTickets.length} tickets found</p>
          </div>
        </div>

        {/* Filters */}
        <div className="ticket-filters">

          <div className="ticket-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search ticket, customer, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-select">
            <Filter size={16} />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <select
            className="priority-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

        {/* Table */}
        <div className="tickets-table-wrapper">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Agent</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="ticket-number">{ticket.id}</td>
                    <td>
                      <div className="ticket-customer">
                        <strong>{ticket.customer}</strong>
                        <span>{ticket.email}</span>
                      </div>
                    </td>
                    <td>{ticket.subject}</td>
                    <td>
                      <span className={`ticket-priority-badge ${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`ticket-status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.agent}</td>
                    <td>{ticket.date}</td>
                    <td>
                      <button
                        className="ticket-view-btn"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-tickets">
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="ticket-modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ticket-modal-heading">
              <div>
                <span>{selectedTicket.id}</span>
                <h3>Ticket Details</h3>
              </div>

              <button onClick={() => setSelectedTicket(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="ticket-detail-content">
              <div>
                <label>Customer</label>
                <strong>{selectedTicket.customer}</strong>
                <span>{selectedTicket.email}</span>
              </div>

              <div>
                <label>Subject</label>
                <strong>{selectedTicket.subject}</strong>
              </div>

              <div>
                <label>Category</label>
                <strong>{selectedTicket.category}</strong>
              </div>

              <div>
                <label>Priority</label>
                <span className={`ticket-priority-badge ${selectedTicket.priority.toLowerCase()}`}>
                  {selectedTicket.priority}
                </span>
              </div>

              <div>
                <label>Assigned Agent</label>
                <strong>{selectedTicket.agent}</strong>
              </div>

              <div>
                <label>Date Created</label>
                <strong>{selectedTicket.date}</strong>
              </div>

              <div className="ticket-description">
                <label>Description</label>
                <p>{selectedTicket.description}</p>
              </div>

              <div className="ticket-status-control">
                <label>Update Ticket Status</label>

                <select
                  value={selectedTicket.status}
                  onChange={(e) =>
                    handleStatusChange(selectedTicket.id, e.target.value)
                  }
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateForm && (
        <div className="ticket-modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="ticket-modal create-ticket-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ticket-modal-heading">
              <div>
                <span>NEW SUPPORT REQUEST</span>
                <h3>Create Ticket</h3>
              </div>

              <button onClick={() => setShowCreateForm(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="create-ticket-form">

              <label>Customer Name</label>
              <input
                required
                value={newTicket.customer}
                onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })}
                placeholder="Enter customer name"
              />

              <label>Email Address</label>
              <input
                type="email"
                required
                value={newTicket.email}
                onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
                placeholder="Enter email address"
              />

              <label>Subject</label>
              <input
                required
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Enter ticket subject"
              />

              <div className="create-ticket-row">
                <div>
                  <label>Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  >
                    <option>General</option>
                    <option>Payment</option>
                    <option>Account</option>
                    <option>Delivery</option>
                    <option>Refund</option>
                    <option>Subscription</option>
                    <option>Billing</option>
                  </select>
                </div>

                <div>
                  <label>Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <label>Description</label>
              <textarea
                required
                rows="4"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                placeholder="Describe the customer's concern..."
              />

              <button type="submit" className="submit-ticket-btn">
                Create Support Ticket
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default CustomerTickets;
