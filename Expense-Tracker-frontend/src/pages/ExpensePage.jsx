import Sidebar from "../components/layout/Sidebar";
import Expense from "../components/transactions/Expense";
import "../styles/layout.css";

const ExpensePage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Expense />
      </div>
    </div>
  );
};

export default ExpensePage;
