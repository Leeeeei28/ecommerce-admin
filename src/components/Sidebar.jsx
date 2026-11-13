
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
  Receipt,
  RotateCcw,
  FileBarChart,
  ShieldCheck,
  Package,
  MapPin,
  Percent,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ activePage, onNavigate }) {
  const supportPages = [
    { name: "Customer Tickets", icon: Ticket },
    { name: "Ticket Management", icon: ClipboardList },
    { name: "Customer Inquiries", icon: MessageSquareText },
    { name: "Support Agents", icon: Users },
    { name: "Knowledge Base", icon: BookOpen },
  ];

  const paymentPages = [
    { name: "Payment Overview", icon: LayoutDashboard },
    { name: "Transactions", icon: Receipt },
    { name: "Refunds & Disputes", icon: RotateCcw },
  ];

  const analyticsPages = [
    { name: "Analytics Overview", icon: LayoutDashboard },
    { name: "Reports & Analytics", icon: FileBarChart },
    { name: "User & Admin Management", icon: ShieldCheck },
  ];

  const logisticsPages = [
    { name: "Logistics Overview", icon: LayoutDashboard },
    { name: "Shipment Tracking", icon: MapPin },
    { name: "Shipping Records", icon: Package },
  ];

  const subscriptionPages = [
    { name: "Subscription Overview", icon: LayoutDashboard },
    { name: "Commission Rules", icon: Percent },
    { name: "Payouts & Settlements", icon: Wallet },
  ];

  const [supportOpen, setSupportOpen] = useState(
    supportPages.some((page) => page.name === activePage)
  );

  const [paymentOpen, setPaymentOpen] = useState(
    paymentPages.some((page) => page.name === activePage)
  );

  const [analyticsOpen, setAnalyticsOpen] = useState(
    analyticsPages.some((page) => page.name === activePage)
  );

  const [logisticsOpen, setLogisticsOpen] = useState(
    logisticsPages.some((page) => page.name === activePage)
  );

  const [subscriptionOpen, setSubscriptionOpen] = useState(
    subscriptionPages.some((page) => page.name === activePage) ||
      activePage === "Subscription & Commission"
  );

  useEffect(() => {
    if (supportPages.some((page) => page.name === activePage)) {
      setSupportOpen(true);
    }

    if (paymentPages.some((page) => page.name === activePage)) {
      setPaymentOpen(true);
    }

    if (
      activePage === "Analytics & Admin" ||
      analyticsPages.some((page) => page.name === activePage)
    ) {
      setAnalyticsOpen(true);
    }

    if (
      activePage === "Logistics & Location" ||
      logisticsPages.some((page) => page.name === activePage)
    ) {
      setLogisticsOpen(true);
    }

    if (
      activePage === "Subscription & Commission" ||
      subscriptionPages.some((page) => page.name === activePage)
    ) {
      setSubscriptionOpen(true);
    }
  }, [activePage]);

  const mainPages = [
    { name: "Dashboard", icon: LayoutDashboard },
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

        {/* Customer Support */}
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

        {/* Payment & Transactions */}
        <div className="sidebar-group">
          <div
            className={`menu-item ${
              activePage === "Payment & Transactions" ||
              paymentPages.some((page) => page.name === activePage)
                ? "active"
                : ""
            }`}
          >
            <button
              className="sidebar-parent-button"
              onClick={() => onNavigate("Payment & Transactions")}
            >
              <CreditCard size={20} />
              <span>Payment & Transactions</span>
            </button>

            <button
              className="sidebar-arrow"
              onClick={() => setPaymentOpen(!paymentOpen)}
              aria-label="Toggle Payment & Transactions menu"
            >
              <ChevronDown
                size={17}
                className={paymentOpen ? "arrow-open" : ""}
              />
            </button>
          </div>

          {paymentOpen && (
            <div className="sidebar-submenu">
              {paymentPages.map((item) => {
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

        {/* Analytics & Admin */}
        <div className="sidebar-group">
          <div
            className={`menu-item ${
              activePage === "Analytics & Admin" ||
              analyticsPages.some((page) => page.name === activePage)
                ? "active"
                : ""
            }`}
          >
            <button
              className="sidebar-parent-button"
              onClick={() => onNavigate("Analytics & Admin")}
            >
              <ChartNoAxesCombined size={20} />
              <span>Analytics & Admin</span>
            </button>

            <button
              className="sidebar-arrow"
              onClick={() => setAnalyticsOpen(!analyticsOpen)}
              aria-label="Toggle Analytics & Admin menu"
            >
              <ChevronDown
                size={17}
                className={analyticsOpen ? "arrow-open" : ""}
              />
            </button>
          </div>

          {analyticsOpen && (
            <div className="sidebar-submenu">
              {analyticsPages.map((item) => {
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

        {/* Logistics & Location */}
        <div className="sidebar-group">
          <div
            className={`menu-item ${
              activePage === "Logistics & Location" ||
              logisticsPages.some((page) => page.name === activePage)
                ? "active"
                : ""
            }`}
          >
            <button
              className="sidebar-parent-button"
              onClick={() => onNavigate("Logistics & Location")}
            >
              <Truck size={20} />
              <span>Logistics & Location</span>
            </button>

            <button
              className="sidebar-arrow"
              onClick={() => setLogisticsOpen(!logisticsOpen)}
              aria-label="Toggle Logistics & Location menu"
            >
              <ChevronDown
                size={17}
                className={logisticsOpen ? "arrow-open" : ""}
              />
            </button>
          </div>

          {logisticsOpen && (
            <div className="sidebar-submenu">
              {logisticsPages.map((item) => {
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

        {/* Subscription & Commission */}
        <div className="sidebar-group">
          <div
            className={`menu-item ${
              activePage === "Subscription & Commission" ||
              subscriptionPages.some((page) => page.name === activePage)
                ? "active"
                : ""
            }`}
          >
            <button
              className="sidebar-parent-button"
              onClick={() => onNavigate("Subscription Overview")}
            >
              <Wallet size={20} />
              <span>Subscription & Commission</span>
            </button>

            <button
              className="sidebar-arrow"
              onClick={() => setSubscriptionOpen(!subscriptionOpen)}
              aria-label="Toggle Subscription & Commission menu"
            >
              <ChevronDown
                size={17}
                className={subscriptionOpen ? "arrow-open" : ""}
              />
            </button>
          </div>

          {subscriptionOpen && (
            <div className="sidebar-submenu">
              {subscriptionPages.map((item) => {
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
      </nav>

      <div className="sidebar-bottom">
        <Settings size={20} />
        <span>Settings</span>
      </div>
    </aside>
  );
}

export default Sidebar;
