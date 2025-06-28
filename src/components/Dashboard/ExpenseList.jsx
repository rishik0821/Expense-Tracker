import { useState } from "react";

function ExpenseList({ expenses, setExpenses, currency }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState({ category: "all", search: "" });
  const [showFilter, setShowFilter] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    expense: null,
  });

  const categories = [
    "all",
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Education",
    "Other",
  ];

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const handleUpdate = () => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === editingId
          ? { ...editForm, amount: parseFloat(editForm.amount) }
          : exp
      )
    );
    setEditingId(null);
  };

  const handleDeleteClick = (expense) => {
    setDeleteModal({ show: true, expense });
  };

  const confirmDelete = () => {
    setExpenses(expenses.filter((exp) => exp.id !== deleteModal.expense.id));
    setDeleteModal({ show: false, expense: null });
  };

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      filter.category === "all" || expense.category === filter.category;
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(filter.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="card-modern p-3 p-md-4 expense-list-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-light mb-0">Recent Expenses</h5>
          <button
            className="btn btn-sm btn-modern"
            onClick={() => setShowFilter(!showFilter)}
          >
            <i className="bi bi-filter"></i>
            <span className="d-none d-sm-inline ms-1">Filter</span>
          </button>
        </div>

        {/* Filter Section */}
        {showFilter && (
          <div className="card-modern p-3 mb-3">
            <div className="row g-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  placeholder="Search expenses..."
                  value={filter.search}
                  onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select bg-dark text-light"
                  value={filter.category}
                  onChange={(e) =>
                    setFilter({ ...filter, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Show message when no expenses */}
        {expenses.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-secondary mb-3 d-block"></i>
            <p className="text-secondary mb-3">No expenses yet</p>
            <p className="text-secondary small">
              Start tracking your expenses by clicking "Add Expense"
            </p>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search fs-1 text-secondary mb-3 d-block"></i>
            <p className="text-secondary">No expenses match your filter</p>
          </div>
        ) : (
          <>
            {/* Mobile view - Cards */}
            <div className="d-md-none expense-list-container">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="card-modern p-3 mb-2">
                  {editingId === expense.id ? (
                    <div className="row g-2">
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control bg-dark text-light mb-2"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control bg-dark text-light"
                          value={editForm.amount}
                          onChange={(e) =>
                            setEditForm({ ...editForm, amount: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-6">
                        <select
                          className="form-select bg-dark text-light"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                        >
                          {categories
                            .filter((cat) => cat !== "all")
                            .map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-12 mt-2">
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={handleUpdate}
                        >
                          <i className="bi bi-check"></i> Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setEditingId(null)}
                        >
                          <i className="bi bi-x"></i> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="text-light mb-1">
                          {expense.description}
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          <small className="text-secondary">
                            {expense.date}
                          </small>
                          <span className="badge bg-secondary small">
                            {expense.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-end">
                        <h6 className="text-danger mb-1">
                          {currency.symbol}
                          {expense.amount}
                        </h6>
                        <div>
                          <button
                            className="btn btn-sm p-1 text-warning"
                            onClick={() => handleEdit(expense)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1 text-danger ms-1"
                            onClick={() => handleDeleteClick(expense)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop view - Table */}
            <div className="table-responsive d-none d-md-block expense-list-container">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th className="text-end">Amount</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      {editingId === expense.id ? (
                        <>
                          <td>{expense.date}</td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm bg-dark text-light"
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  description: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm bg-dark text-light"
                              value={editForm.category}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  category: e.target.value,
                                })
                              }
                            >
                              {categories
                                .filter((cat) => cat !== "all")
                                .map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                            </select>
                          </td>
                          <td className="text-end">
                            <input
                              type="number"
                              step="0.01"
                              className="form-control form-control-sm bg-dark text-light"
                              style={{ maxWidth: "100px", marginLeft: "auto" }}
                              value={editForm.amount}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  amount: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-success me-1"
                              onClick={handleUpdate}
                            >
                              <i className="bi bi-check"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => setEditingId(null)}
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{expense.date}</td>
                          <td>{expense.description}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {expense.category}
                            </span>
                          </td>
                          <td className="text-end">
                            {currency.symbol}
                            {expense.amount}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-warning me-1"
                              onClick={() => handleEdit(expense)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteClick(expense)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <>
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setDeleteModal({ show: false, expense: null })}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content bg-dark border-secondary">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-light">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() =>
                      setDeleteModal({ show: false, expense: null })
                    }
                  ></button>
                </div>
                <div className="modal-body text-light">
                  <p>Are you sure you want to delete this expense?</p>
                  <div className="card-modern p-3 mt-3">
                    <h6 className="text-light mb-2">
                      {deleteModal.expense.description}
                    </h6>
                    <div className="d-flex justify-content-between">
                      <span className="badge bg-secondary">
                        {deleteModal.expense.category}
                      </span>
                      <span className="text-danger fw-bold">
                        {currency.symbol}
                        {deleteModal.expense.amount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setDeleteModal({ show: false, expense: null })
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    <i className="bi bi-trash me-2"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ExpenseList;
