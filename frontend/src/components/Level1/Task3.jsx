import React, { useState } from "react";

const Task3 = () => {
  const [grades, setGrades] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [average, setAverage] = useState(null);

  const addGrade = () => {
    if (!inputValue) return;
    setGrades([...grades, parseFloat(inputValue)]);
    setInputValue("");
  };

  const calculateAverage = async () => {
    if (grades.length === 0) return;

    try {
      const response = await fetch("http://localhost:8080/grades/average", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ grades }),
      });

      if (!response.ok) throw new Error("Failed to calculate average");

      const data = await response.json();
      setAverage(data.average);
    } catch (error) {
      console.error("Error calculating average:", error);
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-800 rounded-lg text-white border border-gray-700 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-blue-400 text-center">📊 Grade Average Calculator</h3>

      <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300">
        <p>
          This task helps calculate the average of student grades. You can enter multiple numeric values (grades)
          and click "Calculate Average" to see the result. The backend performs the average computation.
        </p>
      </div>

      <div className="mb-4 flex">
        <input
          type="number"
          placeholder="Enter grade"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />
        <button
          onClick={addGrade}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Add Grade
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-sm text-gray-400 font-medium mb-1">Grades Entered:</h4>
        <p className="text-yellow-300">{grades.length > 0 ? grades.join(", ") : "No grades added yet."}</p>
      </div>

      <button
        onClick={calculateAverage}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        🧮 Calculate Average
      </button>

      {average !== null && (
        <div className="mt-6 p-3 bg-gray-900 border border-green-600 rounded text-green-400 text-sm text-center">
          <span className="font-semibold">🎓 Average Grade:</span><br />
          <span className="text-lg font-mono">{average}</span>
        </div>
      )}
    </div>
  );
};

export default Task3;
