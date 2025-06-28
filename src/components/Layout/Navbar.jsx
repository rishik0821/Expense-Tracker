import { useState, useEffect, useRef } from "react";

function Navbar({
  currentView,
  setCurrentView,
  currency,
  setCurrency,
  currencies,
}) {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCurrencyDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = (view) => {
    setCurrentView(view);
    setShowMobileMenu(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-modern-dark py-3">
        <div className="container">
          <a
            className="navbar-brand fw-bold d-flex align-items-center"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("dashboard");
            }}
          >
            <span className="me-2" style={{ fontSize: "1.5rem" }}>
              💰
            </span>
            <span style={{ color: "#10b981" }}>Expense</span>
            <span className="ms-1 text-light">Tracker</span>
          </a>

          {/* Desktop Menu */}
          <div className="d-none d-lg-flex align-items-center">
            <a
              className={`nav-link px-3 ${
                currentView === "dashboard" ? "text-primary" : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentView("dashboard");
              }}
            >
              <i className="bi bi-speedometer2 me-1"></i> Dashboard
            </a>
            <a
              className={`nav-link px-3 ${
                currentView === "add" ? "text-primary" : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentView("add");
              }}
            >
              <i className="bi bi-plus-circle me-1"></i> Add Expense
            </a>
            <a
              className={`nav-link px-3 ${
                currentView === "income" ? "text-primary" : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentView("income");
              }}
            >
              <i className="bi bi-arrow-down-circle me-1"></i> Add Income
            </a>
            <a
              className={`nav-link px-3 ${
                currentView === "settings" ? "text-primary" : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentView("settings");
              }}
            >
              <i className="bi bi-gear me-1"></i> Settings
            </a>
            <div className="position-relative ms-2" ref={dropdownRef}>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              >
                {currency} <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {showCurrencyDropdown && (
                <div
                  className="position-absolute end-0 mt-2 py-2 rounded shadow"
                  style={{
                    minWidth: "200px",
                    zIndex: 1000,
                    backgroundColor: "#262626",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {Object.entries(currencies).map(([code, curr]) => (
                    <button
                      key={code}
                      className="d-block w-100 text-start px-3 py-2 border-0 text-light currency-option"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          currency === code ? "#10b981" : "transparent",
                        transition: "background-color 0.2s",
                      }}
                      onClick={() => {
                        setCurrency(code);
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      {curr.symbol} {curr.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="btn btn-modern ms-2">
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn d-lg-none"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{ color: "#10b981", fontSize: "1.5rem" }}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`mobile-sidebar ${showMobileMenu ? "show" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: showMobileMenu ? 0 : "-300px",
          width: "300px",
          height: "100vh",
          backgroundColor: "#1a1a1a",
          transition: "right 0.3s ease",
          zIndex: 1050,
          overflowY: "auto",
        }}
      >
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="text-light mb-0">Menu</h5>
            <button
              className="btn btn-sm"
              onClick={() => setShowMobileMenu(false)}
              style={{ color: "#9ca3af" }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="nav flex-column">
            <a
              className={`nav-link mb-2 rounded px-3 py-3 ${
                currentView === "dashboard"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("dashboard");
              }}
              style={{ transition: "all 0.3s" }}
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
            <a
              className={`nav-link mb-2 rounded px-3 py-3 ${
                currentView === "add" ? "bg-primary text-white" : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("add");
              }}
              style={{ transition: "all 0.3s" }}
            >
              <i className="bi bi-plus-circle me-2"></i> Add Expense
            </a>
            <a
              className={`nav-link mb-2 rounded px-3 py-3 ${
                currentView === "income"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("income");
              }}
              style={{ transition: "all 0.3s" }}
            >
              <i className="bi bi-arrow-down-circle me-2"></i> Add Income
            </a>
            <a
              className={`nav-link mb-2 rounded px-3 py-3 ${
                currentView === "settings"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("settings");
              }}
              style={{ transition: "all 0.3s" }}
            >
              <i className="bi bi-gear me-2"></i> Settings
            </a>

            <div className="mt-3 mb-3">
              <label className="text-secondary small mb-2">Currency</label>
              <select
                className="form-select bg-dark text-light"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {Object.entries(currencies).map(([code, curr]) => (
                  <option key={code} value={code}>
                    {curr.symbol} {curr.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-modern w-100 mt-4"
              onClick={() => setShowMobileMenu(false)}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showMobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setShowMobileMenu(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
        />
      )}
    </>
  );
}

export default Navbar;
