import Sidebar from "../components/layout/Sidebar";
import IncomeList from "../components/transactions/IncomeList";
import "../styles/income.css";
import "../styles/layout.css";

const IncomePage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <IncomeList />
      </div>
    </div>
  );
};

export default IncomePage;
