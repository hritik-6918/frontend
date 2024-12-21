'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from '../components/Dashboard'
import StockForm from '../components/StockForm'
import StockList from '../components/StockList'
import RealTimeStockPrices from '../components/RealTimeStockPrices'

interface Stock {
  _id: string;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
}

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([])

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    try {
      const response = await axios.get<Stock[]>('http://localhost:5000/api/stocks')
      setStocks(response.data)
    } catch (error) {
      console.error('Error fetching stocks:', error)
    }
  }

  const addStock = async (stock: Omit<Stock, '_id'>) => {
    try {
      const response = await axios.post<Stock>('http://localhost:5000/api/stocks', stock)
      setStocks([...stocks, response.data])
    } catch (error) {
      console.error('Error adding stock:', error)
    }
  }

  const updateStock = async (id: string, updatedStock: Partial<Stock>) => {
    try {
      const response = await axios.put<Stock>(`http://localhost:5000/api/stocks/${id}`, updatedStock)
      setStocks(stocks.map(stock => stock._id === id ? response.data : stock))
    } catch (error) {
      console.error('Error updating stock:', error)
    }
  }

  const deleteStock = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/stocks/${id}`)
      setStocks(stocks.filter(stock => stock._id !== id))
    } catch (error) {
      console.error('Error deleting stock:', error)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Portfolio Tracker</h1>
      <Dashboard stocks={stocks} />
      <RealTimeStockPrices stocks={stocks} />
      <StockForm onSubmit={addStock} />
      <StockList stocks={stocks} onUpdate={updateStock} onDelete={deleteStock} />
    </main>
  )
}

