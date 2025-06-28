import { clearAllData } from "../../utils/storage";

function DataManager({ expenses, incomes, budgets, currency }) {
  const handleExport = () => {
    const data = {
      expenses,
      incomes,
      budgets,
      currency,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `expense-tracker-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This cannot be undone!"
      )
    ) {
      clearAllData();
      window.location.reload();
    }
  };

  return (
    <div className="card-modern p-4">
      <h5 className="text-light mb-4">Data Management</h5>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card-modern p-3">
            <h6 className="text-light mb-2">Export Data</h6>
            <p className="text-secondary small mb-3">
              Download all your data as a JSON file for backup
            </p>
            <button className="btn btn-modern w-100" onClick={handleExport}>
              <i className="bi bi-download me-2"></i>Export Data
            </button>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card-modern p-3">
            <h6 className="text-light mb-2">Clear All Data</h6>
            <p className="text-secondary small mb-3">
              Remove all expenses, incomes, and budgets
            </p>
            <button className="btn btn-danger w-100" onClick={handleClearData}>
              <i className="bi bi-trash me-2"></i>Clear All Data
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-dark rounded">
        <h6 className="text-light mb-2">Data Summary</h6>
        <div className="row text-secondary small">
          <div className="col-6 col-md-3">
            <i className="bi bi-arrow-up-circle me-1"></i>
            {expenses.length} Expenses
          </div>
          <div className="col-6 col-md-3">
            <i className="bi bi-arrow-down-circle me-1"></i>
            {incomes.length} Incomes
          </div>
          <div className="col-6 col-md-3">
            <i className="bi bi-piggy-bank me-1"></i>
            {budgets.length} Budgets
          </div>
          <div className="col-6 col-md-3">
            <i className="bi bi-currency-exchange me-1"></i>
            {currency} Currency
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataManager;
