import { useEffect, useState } from "react";
import { getUserTransactions, addTransaction } from "../../api/transactionApi";
import { deleteTransaction } from "../../api/transactionApi";
import "../../styles/income.css";

const categories = [
  "SALARY",
  "BUSINESS",
  "FREELANCE",
  "INTEREST",
  "OTHER"
];

const IncomeList = () => {
  const [income, setIncome] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: ""
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = () => {
    getUserTransactions(userId)
      .then((res) => {
        const onlyIncome = res.data.filter(
          (item) => item.type === "INCOME"
        );
        setIncome(onlyIncome);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
  try {
    await deleteTransaction(id, userId);
    fetchExpenses();
  } catch (err) {
    console.error(err);
  }
};


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async () => {
    if (!form.amount || !form.category || !form.date) return;

    await addTransaction({
      ...form,
      userId,
      type: "INCOME"
    });

    setForm({ amount: "", category: "", date: "" });
    setOpen(false);
    fetchIncome();
  };

  return (
    <div className="income-page">

      {/* INCOME OVERVIEW FIRST */}
      <div className="income-overview">
        <div className="overview-header">
          <div>
            <h3>Income Overview</h3>
            <p>Track your earnings</p>
          </div>

          <button className="add-btn" onClick={() => setOpen(true)}>
            + Add Income
          </button>
        </div>

        <div className="bars">
          {income.map((item) => (
            <div className="bar-group" key={item.id}>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ height: `${item.amount / 80}px` }}
                  title={`₹${item.amount}`}
                />
              </div>
              <span>{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BELOW → INCOME SOURCES */}
      <div className="income-sources">
        <h3>Income Sources</h3>

        {income.map((item) => (
          <div className="source-card" key={item.id}>
            <div>
              <h4>{item.category}</h4>
              <p>{item.date}</p>
            </div>
            <span className="green">+ ₹{item.amount}</span>
            <button
         className="delete-btn"
        onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* ADD INCOME MODAL */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add Income</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />

              <label>Income Source</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select Source</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />

              <button className="save-btn" onClick={handleAdd}>
                Add Income
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeList;
