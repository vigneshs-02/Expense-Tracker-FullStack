import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../components/dashboard/Dashboard";
import Expense from "../components/transactions/Expense";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

const HomePage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Dashboard/>
        <Outlet/>
      </div>
    </div>
  );
};

export default HomePage;
