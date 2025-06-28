// Keys for localStorage
const STORAGE_KEYS = {
  EXPENSES: "expense_tracker_expenses",
  INCOMES: "expense_tracker_incomes",
  BUDGETS: "expense_tracker_budgets",
  CURRENCY: "expense_tracker_currency",
};

// Save data to localStorage
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Load data from localStorage
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return defaultValue;
  }
};

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};

export { STORAGE_KEYS };
