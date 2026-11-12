
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import CustomerSupport from "./pages/CustomerSupport";
import CustomerTickets from "./pages/CustomerTickets";
import TicketManagement from "./pages/TicketManagement";
import CustomerInquiries from "./pages/CustomerInquiries";
import SupportAgents from "./pages/SupportAgents";
import KnowledgeBase from "./pages/KnowledgeBase";

import PaymentOverview from "./pages/PaymentOverview";
import Transactions from "./pages/Transactions";
import RefundsDisputes from "./pages/RefundsDisputes";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        <Header activePage={activePage} />

        <section className="page-content">
          {activePage === "Dashboard" ? (
            <Dashboard />
          ) : activePage === "Customer Support" ? (
            <CustomerSupport />
          ) : activePage === "Customer Tickets" ? (
            <CustomerTickets />
          ) : activePage === "Ticket Management" ? (
            <TicketManagement />
          ) : activePage === "Customer Inquiries" ? (
            <CustomerInquiries />
          ) : activePage === "Support Agents" ? (
            <SupportAgents />
          ) : activePage === "Knowledge Base" ? (
            <KnowledgeBase />
          ) : activePage === "Payment & Transactions" ||
            activePage === "Payment Overview" ? (
            <PaymentOverview />
          ) : activePage === "Transactions" ? (
            <Transactions />
          ) : activePage === "Refunds & Disputes" ? (
            <RefundsDisputes />
          ) : (
            <div className="dashboard-content">
              <h2>{activePage}</h2>
              <p>Welcome to the {activePage} module.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
