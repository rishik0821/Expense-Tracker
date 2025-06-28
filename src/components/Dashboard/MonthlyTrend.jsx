import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function MonthlyTrend({ expenses, currency }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Group expenses by date
    const dailyTotals = expenses.reduce((acc, expense) => {
      acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
      return acc;
    }, {});

    // Sort dates and get last 7 days
    const sortedDates = Object.keys(dailyTotals).sort().slice(-7);
    const amounts = sortedDates.map((date) => dailyTotals[date]);

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: sortedDates.map((date) => {
          const d = new Date(date);
          return d.toLocaleDateString("en", { month: "short", day: "numeric" });
        }),
        datasets: [
          {
            label: "Daily Spending",
            data: amounts,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#10b981",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return currency.symbol + context.parsed.y;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "#9ca3af",
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "#9ca3af",
              callback: function (value) {
                return currency.symbol + value;
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
    return null;
  }

  return (
    <div className="card-modern p-4 mt-4">
      <h5 className="text-light mb-3">Spending Trend (Last 7 Days)</h5>
      <div style={{ height: "250px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default MonthlyTrend;
