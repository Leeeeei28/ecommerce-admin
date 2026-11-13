
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Store,
  Bell,
  ShieldCheck,
  SlidersHorizontal,
  Save,
  Check,
} from "lucide-react";

import "./Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("General");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    storeName: "E-Commerce Admin",
    email: "admin@example.com",
    phone: "+63 912 345 6789",
    address: "Quezon City, Philippines",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    systemNotifications: true,
    paymentAlerts: true,
    supportAlerts: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    currency: "PHP",
    timezone: "Asia/Manila",
    dateFormat: "DD/MM/YYYY",
  });

  const tabs = [
    { name: "General", icon: Store },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: ShieldCheck },
    { name: "Preferences", icon: SlidersHorizontal },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleGeneralChange = (e) => {
    setGeneral({ ...general, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  const handlePreferenceChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <h2>Settings</h2>
          <p>Manage your store and system preferences.</p>
        </div>
        <SettingsIcon size={25} />
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <h3>Settings Menu</h3>

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                className={`settings-tab ${
                  activeTab === tab.name ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <Icon size={18} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="settings-content">
          {activeTab === "General" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <h3>General Settings</h3>
                <p>Update your store information.</p>
              </div>

              <div className="settings-form">
                <div className="settings-field">
                  <label>Store Name</label>
                  <input
                    name="storeName"
                    value={general.storeName}
                    onChange={handleGeneralChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={general.email}
                    onChange={handleGeneralChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Contact Number</label>
                  <input
                    name="phone"
                    value={general.phone}
                    onChange={handleGeneralChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Business Address</label>
                  <input
                    name="address"
                    value={general.address}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <h3>Notification Settings</h3>
                <p>Choose which notifications you want to receive.</p>
              </div>

              {[
                {
                  key: "emailNotifications",
                  title: "Email Notifications",
                  description: "Receive important updates through email.",
                },
                {
                  key: "systemNotifications",
                  title: "System Notifications",
                  description: "Receive notifications inside the system.",
                },
                {
                  key: "paymentAlerts",
                  title: "Payment Alerts",
                  description: "Get notified about payment activities.",
                },
                {
                  key: "supportAlerts",
                  title: "Support Alerts",
                  description: "Get notified about customer support tickets.",
                },
              ].map((item) => (
                <div className="notification-option" key={item.key}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>

                  <button
                    className={`toggle-switch ${
                      notifications[item.key] ? "enabled" : ""
                    }`}
                    onClick={() => toggleNotification(item.key)}
                    aria-label={`Toggle ${item.title}`}
                    aria-pressed={notifications[item.key]}
                  >
                    <span />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Security" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <h3>Security Settings</h3>
                <p>Manage your account password.</p>
              </div>

              <div className="settings-form">
                <div className="settings-field">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={security.currentPassword}
                    onChange={handleSecurityChange}
                  />
                </div>

                <div className="settings-field">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={security.newPassword}
                    onChange={handleSecurityChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={security.confirmPassword}
                    onChange={handleSecurityChange}
                  />
                </div>
              </div>

              <p className="security-note">
                Password changes are currently UI-only. Authentication will
                be connected during backend development.
              </p>
            </div>
          )}

          {activeTab === "Preferences" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <h3>System Preferences</h3>
                <p>Configure your preferred system formats.</p>
              </div>

              <div className="settings-form">
                <div className="settings-field">
                  <label>Currency</label>
                  <select
                    name="currency"
                    value={preferences.currency}
                    onChange={handlePreferenceChange}
                  >
                    <option value="PHP">PHP - Philippine Peso</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Timezone</label>
                  <select
                    name="timezone"
                    value={preferences.timezone}
                    onChange={handlePreferenceChange}
                  >
                    <option value="Asia/Manila">Asia/Manila</option>
                    <option value="Asia/Singapore">Asia/Singapore</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Date Format</label>
                  <select
                    name="dateFormat"
                    value={preferences.dateFormat}
                    onChange={handlePreferenceChange}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="settings-footer">
            <span className="settings-save-message">
              {saved && (
                <>
                  <Check size={16} />
                  Settings saved successfully!
                </>
              )}
            </span>

            <button className="save-settings-btn" onClick={handleSave}>
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
