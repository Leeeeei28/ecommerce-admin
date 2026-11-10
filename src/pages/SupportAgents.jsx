
import { useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  Star,
  Search,
  Mail,
  Headset,
} from "lucide-react";

import "./SupportAgents.css";

function SupportAgents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [agents] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Senior Support Agent",
      status: "Available",
      assignedTickets: 12,
      resolvedTickets: 248,
      responseTime: "12 min",
      csat: "98%",
      initials: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Support Agent",
      status: "Busy",
      assignedTickets: 18,
      resolvedTickets: 196,
      responseTime: "15 min",
      csat: "96%",
      initials: "SJ",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Support Agent",
      status: "Available",
      assignedTickets: 8,
      resolvedTickets: 175,
      responseTime: "10 min",
      csat: "97%",
      initials: "MB",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      role: "Junior Support Agent",
      status: "Offline",
      assignedTickets: 0,
      resolvedTickets: 89,
      responseTime: "22 min",
      csat: "93%",
      initials: "ED",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@example.com",
      role: "Senior Support Agent",
      status: "Busy",
      assignedTickets: 15,
      resolvedTickets: 221,
      responseTime: "14 min",
      csat: "95%",
      initials: "DW",
    },
  ]);

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || agent.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const availableAgents = agents.filter(
    (agent) => agent.status === "Available"
  ).length;

  const busyAgents = agents.filter(
    (agent) => agent.status === "Busy"
  ).length;

  const totalResolved = agents.reduce(
    (total, agent) => total + agent.resolvedTickets,
    0
  );

  return (
    <div className="agents-page">
      <div className="agents-heading">
        <div>
          <h2>Support Agents</h2>
          <p>Manage your support team and monitor agent performance.</p>
        </div>

        <button className="agents-add-btn" disabled title="Coming soon">
          + Add Agent
        </button>
      </div>

      <div className="agents-stats">
        <div className="agent-stat-card">
          <div className="agent-stat-icon blue">
            <Users size={22} />
          </div>
          <div>
            <p>Total Agents</p>
            <h3>{agents.length}</h3>
          </div>
        </div>

        <div className="agent-stat-card">
          <div className="agent-stat-icon green">
            <UserCheck size={22} />
          </div>
          <div>
            <p>Available Agents</p>
            <h3>{availableAgents}</h3>
          </div>
        </div>

        <div className="agent-stat-card">
          <div className="agent-stat-icon orange">
            <Headset size={22} />
          </div>
          <div>
            <p>Busy Agents</p>
            <h3>{busyAgents}</h3>
          </div>
        </div>

        <div className="agent-stat-card">
          <div className="agent-stat-icon purple">
            <Star size={22} />
          </div>
          <div>
            <p>Total Resolved</p>
            <h3>{totalResolved}</h3>
          </div>
        </div>
      </div>

      <div className="agents-panel">
        <div className="agents-panel-heading">
          <div>
            <h3>Agent Directory</h3>
            <p>View your support team's availability and performance.</p>
          </div>
        </div>

        <div className="agents-toolbar">
          <div className="agents-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div className="agents-table-wrapper">
          <table className="agents-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Status</th>
                <th>Assigned Tickets</th>
                <th>Resolved</th>
                <th>Response Time</th>
                <th>CSAT</th>
              </tr>
            </thead>

            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent.id}>
                  <td>
                    <div className="agent-identity">
                      <div className="agent-avatar">
                        {agent.initials}
                      </div>

                      <div>
                        <strong>{agent.name}</strong>
                        <span>{agent.role}</span>
                        <small>
                          <Mail size={12} />
                          {agent.email}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`agent-status ${agent.status.toLowerCase()}`}
                    >
                      {agent.status}
                    </span>
                  </td>

                  <td>{agent.assignedTickets}</td>
                  <td>{agent.resolvedTickets}</td>

                  <td>
                    <span className="agent-response">
                      <Clock size={14} />
                      {agent.responseTime}
                    </span>
                  </td>

                  <td>
                    <span className="agent-csat">
                      <Star size={14} />
                      {agent.csat}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredAgents.length === 0 && (
                <tr>
                  <td colSpan="6" className="agents-empty">
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupportAgents;
