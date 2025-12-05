import React from "react";
import "./home.css";
import DonutChart from "./DonutChart";

export default function TotalPortfolio() {
    const portfolioData = [
  { name: "Bitcoin (BTC)", value: 210 },
  { name: "Ethereum (ETH)", value: 646 },
  { name: "Solana (SOL)", value: 144 },
  { name: "Dogecoin (DOGE)", value: 144 },
  { name: "Duuu", value: 144 },
  { name: "Dogec", value: 144 },
];

  return (
    <div className="totalPortfolio">
      <div className="leftSection">
        <div>
        <p className="title">Portfolio Total</p>
        <h1>$10,275.08</h1>
        </div>
        <p>Last updated: 3:42:12 PM</p>
      </div>

      <div>
        <p className="title">Portfolio Total</p>
        <DonutChart data= {portfolioData}/>
      </div>
    </div>
  );
}
