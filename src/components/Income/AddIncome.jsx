import { useState } from "react";

function AddIncome({ onAddIncome, onClose, currency }) {
  const [income, setIncome] = useState({
    description: "",
    amount: "",
    category: "Salary",
    date: new Date().toISOString().split("T")[0],
  });

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Rental",
    "Gift",
    "Refund",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income.description && income.amount) {
      onAddIncome({
        ...income,
        amount: parseFloat(income.amount),
        id: Date.now(),
      });
      setIncome({
        description: "",
        amount: "",
        category: "Salary",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="card-modern p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-light mb-0">Add New Income</h4>
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
              placeholder="e.g., Monthly Salary"
              value={income.description}
              onChange={(e) =>
                setIncome({ ...income, description: e.target.value })
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
              value={income.amount}
              onChange={(e) => setIncome({ ...income, amount: e.target.value })}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label text-secondary">Category</label>
            <select
              className="form-select bg-dark text-light border-secondary"
              value={income.category}
              onChange={(e) =>
                setIncome({ ...income, category: e.target.value })
              }
            >
              {incomeCategories.map((cat) => (
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
              value={income.date}
              onChange={(e) => setIncome({ ...income, date: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-modern w-100 w-md-auto">
              <i className="bi bi-plus-circle me-2"></i>
              Add Income
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddIncome;
