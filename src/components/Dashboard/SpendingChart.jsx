import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function SpendingChart({ expenses, currency }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (expenses.length === 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      return;
    }

    // Group expenses by category
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categories,
        datasets: [
          {
            data: amounts,
            backgroundColor: [
              "#10b981",
              "#ef4444",
              "#3b82f6",
              "#f59e0b",
              "#8b5cf6",
              "#ec4899",
              "#06b6d4",
              "#84cc16",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#f5f5f5",
              padding: 15,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = currency.symbol + context.parsed;
                const percentage = (
                  (context.parsed / amounts.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses, currency]);

  if (expenses.length === 0) {
    return (
      <div className="card-modern p-4 text-center">
        <i className="bi bi-pie-chart fs-1 text-secondary mb-3 d-block"></i>
        <p className="text-secondary mb-0">No data to display</p>
        <p className="text-secondary small">Add expenses to see charts</p>
      </div>
    );
  }

  return (
    <div className="card-modern p-4">
      <h5 className="text-light mb-3">Spending by Category</h5>
      <div style={{ height: "300px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default SpendingChart;
