import { useState } from "react";
import SummaryCards from "./SummaryCards";
import ExpenseList from "./ExpenseList";
import SpendingChart from "./SpendingChart";
import MonthlyTrend from "./MonthlyTrend";
import BudgetManager from "../Budget/BudgetManager";

function Dashboard({
  expenses,
  setExpenses,
  incomes,
  setIncomes,
  currency,
  budgets,
  setBudgets,
}) {
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div>
      <h2 className="text-light mb-4">Dashboard</h2>

      <SummaryCards
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        currency={currency}
      />

      <div className="row g-4 mb-4 expense-chart-row">
        <div className="col-lg-8">
          <ExpenseList
            expenses={expenses}
            setExpenses={setExpenses}
            currency={currency}
          />
        </div>
        <div className="col-lg-4">
          <SpendingChart expenses={expenses} currency={currency} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <BudgetManager
            budgets={budgets}
            setBudgets={setBudgets}
            expenses={expenses}
            currency={currency}
          />
        </div>
        <div className="col-lg-6">
          {expenses.length > 0 && (
            <MonthlyTrend expenses={expenses} currency={currency} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
