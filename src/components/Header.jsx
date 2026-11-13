
import { useState } from "react";
import {
  Search,
  Bell,
  UserCircle,
  ChevronDown,
  Check,
  Settings,
  User,
  X,
  Sun,
  Moon,
} from "lucide-react";

import "./Header.css";

function Header({ activePage, onNavigate, isDarkMode, onToggleTheme }) {
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New support ticket received",
      message: "A customer submitted a new support request.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment completed",
      message: "A payment transaction was successfully completed.",
      time: "20 minutes ago",
      read: false,
    },
    {
      id: 3,
      title: "Shipment delivered",
      message: "Shipment SHP-1002 has been delivered.",
      time: "1 hour ago",
      read: false,
    },
  ]);

  const pages = [
    "Dashboard",
    "Customer Support",
    "Customer Tickets",
    "Ticket Management",
    "Customer Inquiries",
    "Support Agents",
    "Knowledge Base",
    "Payment Overview",
    "Transactions",
    "Refunds & Disputes",
    "Analytics Overview",
    "Reports & Analytics",
    "User & Admin Management",
    "Logistics Overview",
    "Shipment Tracking",
    "Shipping Records",
    "Subscription Overview",
    "Commission Rules",
    "Payouts & Settlements",
    "Settings",
  ];

  const filteredPages = pages.filter((page) =>
    page.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNavigate = (page) => {
    onNavigate?.(page);
    setSearch("");
    setShowSearchResults(false);
    setShowNotifications(false);
    setShowProfile(false);
  };

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>{activePage}</h2>
        <p>Welcome back, Admin!</p>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="header-search-container">
          <div className="header-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowSearchResults(true);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              onFocus={() => setShowSearchResults(true)}
            />

            {search && (
              <button
                className="search-clear-btn"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {showSearchResults && search.trim() && (
            <div className="search-results">
              <span className="dropdown-heading">Pages</span>

              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <button
                    key={page}
                    className="search-result-item"
                    onClick={() => handleNavigate(page)}
                  >
                    <Search size={15} />
                    <span>{page}</span>
                  </button>
                ))
              ) : (
                <p className="empty-dropdown">
                  No matching pages found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="header-dropdown-container">
          <button
            className="notification-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
              setShowSearchResults(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="notification-dot"></span>
            )}
          </button>

          {showNotifications && (
            <div className="header-dropdown notification-dropdown">
              <div className="dropdown-title">
                <h3>Notifications</h3>

                <button
                  className="mark-read-btn"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
              </div>

              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    className={`notification-item ${
                      notification.read ? "read" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <span className="notification-icon">
                      <Bell size={16} />
                    </span>

                    <span className="notification-content">
                      <strong>{notification.title}</strong>
                      <span>{notification.message}</span>
                      <small>{notification.time}</small>
                    </span>

                    {!notification.read && (
                      <span className="unread-indicator"></span>
                    )}
                  </button>
                ))
              ) : (
                <p className="empty-dropdown">
                  No notifications available.
                </p>
              )}

              {unreadCount === 0 && (
                <p className="notification-footer">
                  <Check size={14} />
                  All notifications are read.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="header-dropdown-container">
          <button
            className="admin-profile"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
              setShowSearchResults(false);
            }}
          >
            <UserCircle size={35} />

            <span className="admin-info">
              <strong>Admin User</strong>
              <small>Administrator</small>
            </span>

            <ChevronDown size={16} />
          </button>

          {showProfile && (
            <div className="header-dropdown profile-dropdown">
              <div className="profile-dropdown-info">
                <UserCircle size={38} />
                <div>
                  <strong>Admin User</strong>
                  <span>Administrator</span>
                </div>
              </div>

              <div className="profile-dropdown-divider"></div>

              <button
                className="profile-menu-item"
                onClick={() => handleNavigate("Settings")}
              >
                <Settings size={17} />
                Settings
              </button>

              <button
                className="profile-menu-item"
                onClick={() => setShowProfile(false)}
              >
                <User size={17} />
                Account Information
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
