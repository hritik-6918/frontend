import { useState } from "react";

export default function StockList({ stocks, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editingStock, setEditingStock] = useState(null);

  const handleEdit = (stock) => {
    setEditingId(stock._id);
    setEditingStock(stock);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingStock({
      ...editingStock,
      [name]:
        name === "quantity" || name === "buyPrice" ? parseFloat(value) : value,
    });
  };

  const handleUpdate = () => {
    onUpdate(editingStock._id, editingStock);
    setEditingId(null);
    setEditingStock(null);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Stock Holdings</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Ticker</th>
            <th className="text-left">Quantity</th>
            <th className="text-left">Buy Price</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td>
                {editingId === stock._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editingStock.name}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  stock.name
                )}
              </td>
              <td>
                {editingId === stock._id ? (
                  <input
                    type="text"
                    name="ticker"
                    value={editingStock.ticker}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  stock.ticker
                )}
              </td>
              <td>
                {editingId === stock._id ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editingStock.quantity}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                    min="1"
                  />
                ) : (
                  stock.quantity
                )}
              </td>
              <td>
                {editingId === stock._id ? (
                  <input
                    type="number"
                    name="buyPrice"
                    value={editingStock.buyPrice}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                    min="0"
                    step="0.01"
                  />
                ) : (
                  `$${stock.buyPrice.toFixed(2)}`
                )}
              </td>
              <td>
                {editingId === stock._id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(stock)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(stock._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
