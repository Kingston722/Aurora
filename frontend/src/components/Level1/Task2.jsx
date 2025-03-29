import React, { useState } from "react";

const Task2 = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const checkPalindrome = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/palindrome`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Palindrome check failed");

      const data = await response.json();
      setResult(data.isPalindrome ? "✅ It's a Palindrome!" : "❌ Not a Palindrome.");
    } catch (error) {
      console.error("Error:", error);
      setResult("⚠️ Error checking palindrome.");
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-800 rounded-lg text-white border border-gray-700 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-blue-400 text-center">🔁 Palindrome Checker</h3>

      <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300">
        <p>
          This task allows you to check if a given word or phrase is a palindrome.
          A palindrome is a sequence that reads the same backward as forward.
          Click "Check" after entering your text to see the result, handled by the backend.
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white mb-4 border border-gray-600 w-full"
      />

      <button
        onClick={checkPalindrome}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        🔍 Check Palindrome
      </button>

      {result !== null && (
        <div className="mt-6 p-3 bg-gray-900 border border-green-600 rounded text-green-600 text-sm text-center">
          <span className="font-semibold">Result:</span><br />
          <span className="text-lg font-mono">{result}</span>
        </div>
      )}
    </div>
  );
};

export default Task2;
