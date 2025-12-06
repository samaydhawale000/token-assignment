import React, { useMemo } from "react";
import "./home.css";
import DonutChart from "./DonutChart";
import { useSelector } from "react-redux";

export default function TotalPortfolio() {
  const portfolio = useSelector((s) => s.portfolio.tokens || []);
  const { lastUpdated } = useSelector((s) => s.portfolio);

  // -----------total portfolio value -----
  const totalValue = useMemo(() => {
    return portfolio.reduce((sum, t) => {
      const val = (t.current_price || t.price || 0) * (t.holdings || 0);
      return sum + val;
    }, 0);
  }, [portfolio]);

  // ----chart data-------
  const portfolioData = useMemo(() => {
    return portfolio.map((t) => ({
      name: `${t.name} (${t.symbol?.toUpperCase()})`,
      value: (t.current_price || t.price || 0) * (t.holdings || 0),
    }));
  }, [portfolio]);

  return (
    <div className="totalPortfolio">
      <div className="leftSection">
        <div>
          <p className="title">Portfolio Total</p>
          <h1>${totalValue.toLocaleString()}</h1>
        </div>

        <p>
          Last updated:{" "}
          {lastUpdated
            ? new Date(lastUpdated).toLocaleTimeString()
            : "No updates yet"}
        </p>
      </div>

      <div style={{ position: "relative" }}>
        <p className="title">Portfolio Total</p>

        {portfolioData.length === 0 && (
          <h6 className="noDataAvailableWrapper">No Data Available</h6>
        )}

        <DonutChart data={portfolioData} />
      </div>
    </div>
  );
}
