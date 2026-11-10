
import { Search, Bell, UserCircle, ChevronDown } from "lucide-react";
import "./Header.css";

function Header({ activePage }) {
  return (
    <header className="header">

      <div className="header-left">
        <h2>{activePage}</h2>
        <p>Welcome back, Admin!</p>
      </div>

      <div className="header-right">

        <div className="header-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search anything..."
          />
        </div>

        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="admin-profile">
          <UserCircle size={35} />

          <div className="admin-info">
            <h4>Admin User</h4>
            <span>Administrator</span>
          </div>

          <ChevronDown size={16} />
        </div>

      </div>

    </header>
  );
}

export default Header;
