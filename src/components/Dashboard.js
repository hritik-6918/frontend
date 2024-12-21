import { useState, useEffect } from "react";

export default function Dashboard({ stocks }) {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      const symbols = stocks.map((stock) => stock.ticker).join(",");
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbols}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Fetch prices every minute

    return () => clearInterval(interval);
  }, [stocks]);

  const totalValue = stocks.reduce((sum, stock) => {
    const currentPrice = prices[stock.ticker]?.c || stock.buyPrice;
    return sum + stock.quantity * currentPrice;
  }, 0);

  const topPerformingStock = stocks.reduce(
    (top, stock) => {
      const currentPrice = prices[stock.ticker]?.c || stock.buyPrice;
      const performance = (currentPrice - stock.buyPrice) / stock.buyPrice;
      return performance > top.performance ? { ...stock, performance } : top;
    },
    { name: "N/A", performance: -Infinity }
  );

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-bold">Total Portfolio Value</h3>
          <p>${totalValue.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="font-bold">Number of Stocks</h3>
          <p>{stocks.length}</p>
        </div>
        <div>
          <h3 className="font-bold">Top Performing Stock</h3>
          <p>
            {topPerformingStock.name} (
            {(topPerformingStock.performance * 100).toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
}
