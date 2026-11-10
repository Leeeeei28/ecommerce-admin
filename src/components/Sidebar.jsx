import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  Headset,
  Ticket,
  ClipboardList,
  MessageSquareText,
  Users,
  BookOpen,
  CreditCard,
  ChartNoAxesCombined,
  Truck,
  Wallet,
  Settings,
  ChevronDown,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ activePage, onNavigate }) {
  const [supportOpen, setSupportOpen] = useState(
    [
      "Customer Tickets",
      "Ticket Management",
      "Customer Inquiries",
      "Support Agents",
      "Knowledge Base",
    ].includes(activePage)
  );

  const supportPages = [
    { name: "Customer Tickets", icon: Ticket },
    { name: "Ticket Management", icon: ClipboardList },
    { name: "Customer Inquiries", icon: MessageSquareText },
    { name: "Support Agents", icon: Users },
    { name: "Knowledge Base", icon: BookOpen },
  ];

  useEffect(() => {
    if (supportPages.some((page) => page.name === activePage)) {
      setSupportOpen(true);
    }
  }, [activePage]);

  const mainPages = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Payment & Transactions", icon: CreditCard },
    { name: "Analytics & Admin", icon: ChartNoAxesCombined },
    { name: "Logistics & Location", icon: Truck },
    { name: "Subscription & Commission", icon: Wallet },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>E-Commerce</h2>
        <span>Admin System</span>
      </div>

      <p className="menu-label">MAIN MENU</p>

      <nav className="sidebar-menu">
        {mainPages.slice(0, 1).map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}

        <div className="sidebar-group">
          <div
            className={`menu-item ${
              activePage === "Customer Support" ||
              supportPages.some((page) => page.name === activePage)
                ? "active"
                : ""
            }`}
          >
            <button
              className="sidebar-parent-button"
              onClick={() => onNavigate("Customer Support")}
            >
              <Headset size={20} />
              <span>Customer Support</span>
            </button>

            <button
              className="sidebar-arrow"
              onClick={() => setSupportOpen(!supportOpen)}
              aria-label="Toggle Customer Support menu"
            >
              <ChevronDown
                size={17}
                className={supportOpen ? "arrow-open" : ""}
              />
            </button>
          </div>

          {supportOpen && (
            <div className="sidebar-submenu">
              {supportPages.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    className={`submenu-item ${
                      activePage === item.name ? "active" : ""
                    }`}
                    onClick={() => onNavigate(item.name)}
                  >
                    <Icon size={17} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {mainPages.slice(1).map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <Settings size={20} />
        <span>Settings</span>
      </div>
    </aside>
  );
}

export default Sidebar;