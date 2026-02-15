import { useEffect, useState } from "react";
import { getDashboardSummary, getUserTransactions } from "../../api/transactionApi";
import "../../styles/dashboard.css";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const Dashboard = () => {
  const userId = localStorage.getItem("userId");

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Fetch Summary
    getDashboardSummary(userId)
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));

    // Fetch Transactions
    getUserTransactions(userId)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactions(sorted);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const displayedTransactions = showAll
    ? transactions
    : transactions.slice(0, 5);

  const pieData = [
    { name: "Income", value: summary.totalIncome },
    { name: "Expense", value: summary.totalExpense },
    { name: "Balance", value: summary.balance },
  ];

  const COLORS = ["#22c55e", "#ef4444", " #4f46e5"];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* TOP CARDS */}
      <div className="cards">
        <div className="card income">
          <p>Total Income</p>
          <h3>₹ {summary.totalIncome}</h3>
        </div>

        <div className="card expense">
          <p>Total Expense</p>
          <h3>₹{summary.totalExpense}</h3>
        </div>

        <div className="card balance">
          <p>Balance</p>
          <h3>₹{summary.balance}</h3>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="dashboard-bottom">
        
        {/* RECENT TRANSACTIONS */}
        <div className="recent">
          <div className="recent-header">
            <h3>Recent Transactions</h3>

            {transactions.length > 5 && (
              <button
                className="see-all-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "See All"}
              </button>
            )}
          </div>

          <ul className={showAll ? "scrollable" : ""}>
            {displayedTransactions.map((tx) => (
              <li key={tx.id}>
                <span>{tx.category}</span>
                <span className={tx.type === "EXPENSE" ? "minus" : "plus"}>
                  {tx.type === "EXPENSE" ? "-" : "+"}₹{tx.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* PIE CHART */}
        <div className="overview">
          <h3>Financial Overview</h3>

          <PieChart width={260} height={260}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
