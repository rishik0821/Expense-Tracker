function SummaryCards({ totalExpense, totalIncome, currency }) {
  const balance = totalIncome - totalExpense;

  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-md-4">
        <div className="card-modern p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-secondary mb-1 small">Total Income</p>
              <h4 className="text-light mb-0">
                {currency.symbol}
                {totalIncome}
              </h4>
            </div>
            <div
              className="icon-wrapper"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}
            >
              <i className="bi bi-arrow-down-circle-fill text-success fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-modern p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-secondary mb-1 small">Total Expenses</p>
              <h4 className="text-light mb-0">
                {currency.symbol}
                {totalExpense}
              </h4>
            </div>
            <div
              className="icon-wrapper"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
            >
              <i className="bi bi-arrow-up-circle-fill text-danger fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-modern p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-secondary mb-1 small">Balance</p>
              <h4
                className={`mb-0 ${
                  balance >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {currency.symbol}
                {balance}
              </h4>
            </div>
            <div
              className="icon-wrapper"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}
            >
              <i className="bi bi-wallet-fill text-primary fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
