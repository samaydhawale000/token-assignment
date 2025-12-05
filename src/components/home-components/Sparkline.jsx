import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function Sparkline({ prices = [], color = "#32CD32" }) {
  const data = {
    labels: prices.map((_, i) => i), // dummy x-axis
    datasets: [
      {
        data: prices,
        borderColor: color,
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div style={{ width: "120px", height: "35px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
