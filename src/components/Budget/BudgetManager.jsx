import { useState } from "react";

function BudgetManager({ budgets, setBudgets, expenses, currency }) {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: "Food", limit: "" });

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

  // Calculate spent amount for each category
  const getSpentAmount = (category) => {
    return expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.limit) {
      setBudgets([
        ...budgets,
        { ...newBudget, limit: parseFloat(newBudget.limit), id: Date.now() },
      ]);
      setNewBudget({ category: "Food", limit: "" });
      setShowAddBudget(false);
    }
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const getProgressColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "danger";
    if (percentage >= 70) return "warning";
    return "success";
  };

  return (
    <div className="card-modern p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-light mb-0">Budget Tracking</h5>
        <button
          className="btn btn-sm btn-modern"
          onClick={() => setShowAddBudget(!showAddBudget)}
        >
          <i className="bi bi-plus-circle"></i> Add Budget
        </button>
      </div>

      {showAddBudget && (
        <div className="card-modern p-3 mb-3">
          <div className="row g-2">
            <div className="col-md-5">
              <select
                className="form-select bg-dark text-light"
                value={newBudget.category}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-dark text-light border-secondary">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  className="form-control bg-dark text-light"
                  placeholder="Budget limit"
                  value={newBudget.limit}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, limit: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={handleAddBudget}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {budgets.length === 0 ? (
        <div className="text-center py-4">
          <i className="bi bi-piggy-bank fs-1 text-secondary mb-3 d-block"></i>
          <p className="text-secondary">No budgets set yet</p>
          <p className="text-secondary small">
            Set budgets to track your spending
          </p>
        </div>
      ) : (
        <div className="budget-list">
          {budgets.map((budget) => {
            const spent = getSpentAmount(budget.category);
            const percentage = Math.min((spent / budget.limit) * 100, 100);
            const progressColor = getProgressColor(spent, budget.limit);

            return (
              <div key={budget.id} className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <span className="text-light">{budget.category}</span>
                    <small className="text-secondary ms-2">
                      {currency.symbol}
                      {spent} / {currency.symbol}
                      {budget.limit}
                    </small>
                  </div>
                  <button
                    className="btn btn-sm text-danger"
                    onClick={() => handleDeleteBudget(budget.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className={`progress-bar bg-${progressColor}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                {percentage >= 90 && (
                  <small className="text-danger mt-1 d-block">
                    <i className="bi bi-exclamation-circle me-1"></i>
                    {percentage >= 100
                      ? "Budget exceeded!"
                      : "Almost at limit!"}
                  </small>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BudgetManager;
