import { useState } from "react";

function AddExpense({ onAddExpense, onClose, currency }) {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Education",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.description && expense.amount) {
      onAddExpense({
        ...expense,
        amount: parseFloat(expense.amount),
        id: Date.now(),
      });
      setExpense({
        description: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="card-modern p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-light mb-0">Add New Expense</h4>
        <button onClick={onClose} className="btn btn-sm btn-outline-secondary">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label text-secondary">Description</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              placeholder="e.g., Coffee at Starbucks"
              value={expense.description}
              onChange={(e) =>
                setExpense({ ...expense, description: e.target.value })
              }
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label text-secondary">
              Amount ({currency.symbol})
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control bg-dark text-light border-secondary"
              placeholder="0.00"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label text-secondary">Category</label>
            <select
              className="form-select bg-dark text-light border-secondary"
              value={expense.category}
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label text-secondary">Date</label>
            <input
              type="date"
              className="form-control bg-dark text-light border-secondary"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-modern w-100 w-md-auto">
              <i className="bi bi-plus-circle me-2"></i>
              Add Expense
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
