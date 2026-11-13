
import { useMemo, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Power,
  Percent,
  X,
} from "lucide-react";

import "./CommissionRules.css";

function CommissionRules() {
  const [rules, setRules] = useState([
    {
      id: "COM-1001",
      name: "Basic Plan Commission",
      plan: "Basic",
      type: "Percentage",
      rate: 5,
      status: "Active",
    },
    {
      id: "COM-1002",
      name: "Premium Plan Commission",
      plan: "Premium",
      type: "Percentage",
      rate: 10,
      status: "Active",
    },
    {
      id: "COM-1003",
      name: "Enterprise Commission",
      plan: "Enterprise",
      type: "Percentage",
      rate: 15,
      status: "Active",
    },
    {
      id: "COM-1004",
      name: "Special Fixed Commission",
      plan: "All Plans",
      type: "Fixed Amount",
      rate: 500,
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    plan: "Basic",
    type: "Percentage",
    rate: "",
  });

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      const matchesSearch =
        rule.id.toLowerCase().includes(search.toLowerCase()) ||
        rule.name.toLowerCase().includes(search.toLowerCase()) ||
        rule.plan.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || rule.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rules, search, statusFilter]);

  const activeRules = rules.filter(
    (rule) => rule.status === "Active"
  ).length;

  const inactiveRules = rules.filter(
    (rule) => rule.status === "Inactive"
  ).length;

  const openAddModal = () => {
    setEditingRule(null);
    setFormData({
      name: "",
      plan: "Basic",
      type: "Percentage",
      rate: "",
    });
    setShowModal(true);
  };

  const openEditModal = (rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      plan: rule.plan,
      type: rule.type,
      rate: String(rule.rate),
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rate = Number(formData.rate);

    if (!formData.name.trim() || !Number.isFinite(rate) || rate <= 0) {
      return;
    }

    if (formData.type === "Percentage" && rate > 100) {
      return;
    }

    if (editingRule) {
      setRules((currentRules) =>
        currentRules.map((rule) =>
          rule.id === editingRule.id
            ? { ...rule, ...formData, name: formData.name.trim(), rate }
            : rule
        )
      );
    } else {
      const newRule = {
        id: `COM-${Date.now().toString().slice(-6)}`,
        ...formData,
        name: formData.name.trim(),
        rate,
        status: "Active",
      };

      setRules((currentRules) => [newRule, ...currentRules]);
    }

    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setRules((currentRules) =>
      currentRules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              status: rule.status === "Active" ? "Inactive" : "Active",
            }
          : rule
      )
    );
  };

  return (
    <div className="commission-rules">
      <div className="commission-heading">
        <div>
          <h1>Commission Rules</h1>
          <p>Manage commission rates and subscription plan rules.</p>
        </div>

        <button className="commission-add-button" onClick={openAddModal}>
          <Plus size={18} />
          Add Commission Rule
        </button>
      </div>

      <div className="commission-stats">
        <div className="commission-stat-card">
          <div className="commission-stat-icon blue">
            <Percent size={22} />
          </div>
          <h2>{rules.length}</h2>
          <p>Total Rules</p>
        </div>

        <div className="commission-stat-card">
          <div className="commission-stat-icon green">
            <Power size={22} />
          </div>
          <h2>{activeRules}</h2>
          <p>Active Rules</p>
        </div>

        <div className="commission-stat-card">
          <div className="commission-stat-icon orange">
            <Power size={22} />
          </div>
          <h2>{inactiveRules}</h2>
          <p>Inactive Rules</p>
        </div>
      </div>

      <div className="commission-panel">
        <div className="commission-panel-heading">
          <div>
            <h2>Commission Rules List</h2>
            <p>View and manage your commission configurations.</p>
          </div>
        </div>

        <div className="commission-filters">
          <div className="commission-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search rule ID, name, or plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="commission-table-wrapper">
          <table className="commission-table">
            <thead>
              <tr>
                <th>Rule ID</th>
                <th>Rule Name</th>
                <th>Subscription Plan</th>
                <th>Commission Type</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRules.length > 0 ? (
                filteredRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>{rule.id}</td>
                    <td>{rule.name}</td>
                    <td>{rule.plan}</td>
                    <td>{rule.type}</td>
                    <td>
                      {rule.type === "Percentage"
                        ? `${rule.rate}%`
                        : `₱${rule.rate.toLocaleString("en-PH")}`}
                    </td>
                    <td>
                      <span
                        className={`commission-status ${rule.status.toLowerCase()}`}
                      >
                        {rule.status}
                      </span>
                    </td>
                    <td>
                      <div className="commission-actions">
                        <button
                          className="commission-edit-button"
                          title="Edit rule"
                          onClick={() => openEditModal(rule)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className={`commission-toggle-button ${
                            rule.status === "Active" ? "deactivate" : "activate"
                          }`}
                          title={
                            rule.status === "Active"
                              ? "Deactivate rule"
                              : "Activate rule"
                          }
                          onClick={() => toggleStatus(rule.id)}
                        >
                          <Power size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="commission-empty">
                    No commission rules found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="commission-modal-overlay">
          <div className="commission-modal">
            <div className="commission-modal-heading">
              <div>
                <h2>
                  {editingRule ? "Edit Commission Rule" : "Add Commission Rule"}
                </h2>
                <p>Enter the commission rule details below.</p>
              </div>

              <button
                className="commission-close-button"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="commission-form-group">
                <label>Rule Name</label>
                <input
                  type="text"
                  placeholder="Enter rule name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="commission-form-group">
                <label>Subscription Plan</label>
                <select
                  value={formData.plan}
                  onChange={(e) =>
                    setFormData({ ...formData, plan: e.target.value })
                  }
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="All Plans">All Plans</option>
                </select>
              </div>

              <div className="commission-form-group">
                <label>Commission Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
              </div>

              <div className="commission-form-group">
                <label>
                  {formData.type === "Percentage"
                    ? "Commission Rate (%)"
                    : "Commission Amount (₱)"}
                </label>
                <input
                  type="number"
                  min="0.01"
                  max={formData.type === "Percentage" ? "100" : undefined}
                  step="0.01"
                  placeholder="Enter commission rate"
                  value={formData.rate}
                  onChange={(e) =>
                    setFormData({ ...formData, rate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="commission-modal-actions">
                <button
                  type="button"
                  className="commission-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="commission-save-button">
                  {editingRule ? "Save Changes" : "Create Rule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommissionRules;
