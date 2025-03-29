import React, { useState } from "react";
import axios from "axios";

const Task4 = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");

  const handleConvert = async () => {
    try {
      const response = await axios.get("http://localhost:8080/currency/convert", {
        params: {
          amount: parseFloat(amount),
          from: fromCurrency,
          to: toCurrency,
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error converting currency:", error);
      setResult("❌ Failed to convert. Please try again.");
    }
  };

  return (
    <div className="mt-4 p-6 bg-gray-800 rounded-lg text-white max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-green-400">💱 Currency Converter</h3>

      <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300">
        <p>
          This task allows you to convert currency values between different global currencies using
          real-time exchange rates. Enter the amount, choose your base and target currency, and get
          instant results using a backend-powered API.
        </p>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-yellow-300 font-semibold">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Enter amount"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block mb-1 text-yellow-300 font-semibold">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className="w-1/2">
          <label className="block mb-1 text-yellow-300 font-semibold">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Convert 💱
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-700 rounded border border-green-600 text-green-600 text-sm text-center">
          <p className="text-center text-lg font-semibold text-green-300">{result}</p>
        </div>
      )}
    </div>
  );
};

export default Task4;
