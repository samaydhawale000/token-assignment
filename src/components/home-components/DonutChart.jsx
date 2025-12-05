import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const DonutChart = ({ data }) => {
  const colors = [
    "#33CC99", 
    "#6666FF", 
    "#33CCFF", 
    "#FF9933", 
    "#FFCC00", 
    "#FF6666", 
    "#e04444ff", 
    "#66ffadff", 
    "#66ffe0ff", 
  ];

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rightWrapper">
   
      <div style={{ width: "180px"}}>
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
            <span style={{ color: colors[i] }}>
              {item.name}
            </span>
            <span style={{ color: "rgba(161, 161, 170, 1)" }}>
              {((item.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
