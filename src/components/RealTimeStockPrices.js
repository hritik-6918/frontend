import { useState, useEffect } from "react";

export default function RealTimeStockPrices({ stocks }) {
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

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Real-Time Stock Prices</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Ticker</th>
            <th className="text-left">Current Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td>{stock.ticker}</td>
              <td>${prices[stock.ticker]?.c.toFixed(2) || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
