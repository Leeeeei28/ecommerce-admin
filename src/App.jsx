
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
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
