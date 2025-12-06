import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

// --- generate LIGHT unique colors ---
const generateColors = (count) => {
  const set = new Set();

  while (set.size < count) {
    const h = Math.floor(Math.random() * 360);
    const s = 70 + Math.random() * 10;
    const l = 70 + Math.random() * 15;
    set.add(`hsl(${h}, ${s}%, ${l}%)`);
  }

  return [...set];
};

const DonutChart = ({ data }) => {

  // memoized color generation
  const colors = useMemo(() => generateColors(data.length), [data.length]);

  // memoized chart data
  const chartData = useMemo(() => ({
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  }), [data, colors]);

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data]
  );

  return (
    <div className="rightWrapper">
      <div style={{ width: "180px" }}>
        <Doughnut
          data={chartData}
          options={{
            cutout: "50%",
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
          }}
        />
      </div>

      <div className="legendsWrapper">
        {data.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            <span style={{ color: colors[i] }}>{item.name}</span>
            <span style={{ color: "rgba(161, 161, 170, 1)" }}>
              {total === 0 ? "0.0%" : ((item.value / total) * 100).toFixed(1) + "%"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DonutChart);
