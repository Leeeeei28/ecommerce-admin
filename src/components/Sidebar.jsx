
import {
  LayoutDashboard,
  Headset,
  CreditCard,
  ChartNoAxesCombined,
  Truck,
  Wallet,
  Settings,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ activePage, onNavigate }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Customer Support", icon: Headset },
    { name: "Payment & Transactions", icon: CreditCard },
    { name: "Analytics & Admin", icon: ChartNoAxesCombined },
    { name: "Logistics & Location", icon: Truck },
    { name: "Subscription & Commission", icon: Wallet },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>E-Commerce</h2>
        <span>Admin Panel</span>
      </div>

      <div className="sidebar-menu">
        <p className="menu-label">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className={`menu-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <Settings size={20} />
        <span>Settings</span>
      </div>
    </aside>
  );
}

export default Sidebar;
