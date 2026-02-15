import { useState } from "react";
import { addTransaction } from "../../api/transactionApi";
import "../../styles/income.css";

const AddIncomeModal = ({ onClose, onAdded }) => {
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    category: "SALARY",
    amount: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTransaction({
        userId,
        category: form.category,
        amount: form.amount,
        date: form.date,
        type: "INCOME"
      });

      onAdded();
      onClose();
    } catch (err) {
      console.error("Add Income Error:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add Income</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="SALARY">Salary</option>
            <option value="BUSINESS">Business</option>
            <option value="FREELANCE">Freelance</option>
            <option value="INTEREST">Interest</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <button type="submit" className="save-btn">
            Save Income
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
