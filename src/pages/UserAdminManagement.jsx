
import { useState } from "react";

import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  Plus,
  Search,
  Pencil,
  X,
} from "lucide-react";

import "./UserAdminManagement.css";

function UserAdminManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Dela Cruz",
      email: "juan@email.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      role: "Staff",
      status: "Active",
    },
    {
      id: 3,
      name: "Pedro Reyes",
      email: "pedro@email.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 4,
      name: "Ana Garcia",
      email: "ana@email.com",
      role: "Staff",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Carlos Mendoza",
      email: "carlos@email.com",
      role: "Customer",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Customer",
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;
  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;
  const adminUsers = users.filter(
    (user) => user.role === "Admin"
  ).length;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All Roles" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "All Status" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "Customer",
    });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? { ...user, ...formData }
            : user
        )
      );
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        status: "Active",
      };

      setUsers((currentUsers) => [...currentUsers, newUser]);
    }

    closeModal();
  };

  const toggleStatus = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  return (
    <div className="user-admin-management">
      <div className="user-admin-header">
        <div>
          <h2>User & Admin Management</h2>
          <p>Manage user accounts, roles, and account access.</p>
        </div>

        <button className="add-user-btn" onClick={openAddModal}>
          <Plus size={17} />
          Add User
        </button>
      </div>

      <div className="user-admin-stats">
        <div className="user-admin-stat-card">
          <div className="user-admin-stat-icon blue">
            <Users size={21} />
          </div>
          <p>Total Users</p>
          <h3>{totalUsers}</h3>
        </div>

        <div className="user-admin-stat-card">
          <div className="user-admin-stat-icon green">
            <UserCheck size={21} />
          </div>
          <p>Active Users</p>
          <h3>{activeUsers}</h3>
        </div>

        <div className="user-admin-stat-card">
          <div className="user-admin-stat-icon red">
            <UserX size={21} />
          </div>
          <p>Inactive Users</p>
          <h3>{inactiveUsers}</h3>
        </div>

        <div className="user-admin-stat-card">
          <div className="user-admin-stat-icon purple">
            <ShieldCheck size={21} />
          </div>
          <p>Administrators</p>
          <h3>{adminUsers}</h3>
        </div>
      </div>

      <div className="user-admin-panel">
        <div className="user-admin-panel-header">
          <div>
            <h3>User Accounts</h3>
            <p>View and manage registered system users.</p>
          </div>
        </div>

        <div className="user-admin-filters">
          <div className="user-admin-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>All Roles</option>
            <option>Admin</option>
            <option>Staff</option>
            <option>Customer</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="user-admin-table-wrapper">
          <table className="user-admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h4>{user.name}</h4>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`user-role ${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`user-status ${user.status.toLowerCase()}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <div className="user-actions">
                        <button
                          className="edit-user-btn"
                          onClick={() => openEditModal(user)}
                          title="Edit user"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className={`toggle-user-btn ${
                            user.status === "Active" ? "deactivate" : "activate"
                          }`}
                          onClick={() => toggleStatus(user.id)}
                        >
                          {user.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-users">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="user-modal-overlay">
          <div className="user-modal">
            <div className="user-modal-header">
              <div>
                <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
                <p>
                  {editingUser
                    ? "Update the user's account information."
                    : "Enter the details for the new account."}
                </p>
              </div>

              <button className="close-user-modal" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="user-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="user-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="user-form-group">
                <label>User Role</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option>Admin</option>
                  <option>Staff</option>
                  <option>Customer</option>
                </select>
              </div>

              <div className="user-modal-actions">
                <button
                  type="button"
                  className="cancel-user-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="save-user-btn">
                  {editingUser ? "Save Changes" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAdminManagement;
