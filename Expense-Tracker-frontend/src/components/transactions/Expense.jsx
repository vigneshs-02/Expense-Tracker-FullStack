import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getUserTransactions, addTransaction } from "../../api/transactionApi";
import "../../styles/expense.css";
import { deleteTransaction } from "../../api/transactionApi";


const expenseCategories = [
  "FOOD",
  "RENT",
  "TRAVEL",
  "SHOPPING",
  "OTHERS"
];

const Expense = () => {
  const userId = localStorage.getItem("userId");
  console.log("UserId:", userId);

  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await getUserTransactions(userId);
    const onlyExpense = res.data.filter(
      (item) => item.type === "EXPENSE"
    );
    setExpenses(onlyExpense);
  };

const handleDelete = async (id) => {
  try {
    await deleteTransaction(id, userId);
    await fetchExpenses();
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    if (!form.date || !form.amount || !form.category) return;

    await addTransaction({
      ...form,
      userId,
      type: "EXPENSE",
    });
    setOpen(false);
    setForm({ date: "", amount: "", category: "" });
    fetchExpenses();
  };

  return (
    <div className="expense-page">

      {/* ===== EXPENSE OVERVIEW ===== */}
      <div className="expense-overview">
        <div className="overview-header">
          <div>
            <h3>Expense Overview</h3>
            <p>Track your spending over time</p>
          </div>
          <button className="add-btn" onClick={() => setOpen(true)}>
            + Add Expense
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={expenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#7c3aed" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== ALL EXPENSES LIST ===== */}
      <div className="expense-list">
        <h3>All Expenses</h3>

        {expenses.map((e) => (
          <div className="expense-card" key={e.id}>
            <div>
              <h4>{e.category}</h4>
              <p>{e.date}</p>
            </div>
            <span className="red">- ₹{e.amount}</span>
            <button onClick={() => handleDelete(e.id)} className="delete-btn">
  Delete
</button>

          </div>
        ))}
      </div>

      {/* ===== ADD EXPENSE MODAL ===== */}
      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Expense</h3>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>

            <div className="modal-body">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select Expense Category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button className="save-btn" onClick={handleAdd}>
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
