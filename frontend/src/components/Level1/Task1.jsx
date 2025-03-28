import React, { useState } from "react";

const Task1 = () => {
  const [temperature, setTemperature] = useState("");
  const [unit, setUnit] = useState("Celsius");
  const [convertedTemp, setConvertedTemp] = useState(null);

  const handleConvert = async () => {
    if (!temperature) return;

    try {
      const response = await fetch("http://localhost:8080/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature: parseFloat(temperature),
          unit: unit === "Celsius" ? "C" : "F",
        }),
      });

      if (!response.ok) throw new Error("Conversion failed");

      const data = await response.json();
      setConvertedTemp(data.converted);
    } catch (error) {
      console.error("Conversion error:", error);
      setConvertedTemp("Error during conversion");
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-800 rounded-lg text-white border border-gray-700 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-blue-400 text-center">🌡️ Temperature Converter</h3>

      <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300">
        <p>
          This task allows you to convert temperatures between Celsius and Fahrenheit.
          Enter the temperature, select the unit, and click "Convert" to see the result
          calculated from the Spring Boot backend.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 w-full"
        >
          <option value="Celsius">Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
        </select>
      </div>

      <button
        onClick={handleConvert}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        🔄 Convert
      </button>

      {convertedTemp !== null && (
        <div className="mt-6 p-3 bg-gray-900 border border-green-600 rounded text-green-600 text-sm text-center">
          <span className="font-semibold">Converted Temperature:</span><br />
          <span className="text-lg font-mono">
            {convertedTemp}° {unit === "Celsius" ? "Fahrenheit" : "Celsius"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Task1;
