import React, { useState } from "react";

const Task4 = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleGeneratePassword = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          length,
          includeNumbers,
          includeLowercase,
          includeUppercase,
          includeSpecial,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate password");

      const data = await response.json();
      setGeneratedPassword(data.password);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-800 rounded-lg text-white border border-gray-700 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-blue-400 text-center">🔐 Password Generator</h3>

      <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300">
        <p>
          This task allows you to generate strong, secure passwords based on customizable settings.
          Choose the length and character types (numbers, uppercase, lowercase, and symbols), then
          click the "Generate Password" button to create a password instantly.
        </p>
      </div>

      {/* Password Length */}
      <label className="block mb-3 font-medium text-sm">
        Password Length:
        <input
          type="number"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="ml-2 p-1 w-20 rounded bg-gray-700 text-white border border-gray-600"
        />
      </label>

      {/* Checkboxes */}
      <div className="space-y-2 text-sm mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2 accent-blue-500"
          />
          Include Numbers (0-9)
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="mr-2 accent-blue-500"
          />
          Include Lowercase (a-z)
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2 accent-blue-500"
          />
          Include Uppercase (A-Z)
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeSpecial}
            onChange={() => setIncludeSpecial(!includeSpecial)}
            className="mr-2 accent-blue-500"
          />
          Include Special Characters (!@#$%^&*)
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGeneratePassword}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
      >
        🚀 Generate Password
      </button>

      {/* Output */}
      {generatedPassword && (
        <div className="mt-6 p-3 bg-gray-900 border border-green-600 rounded text-green-400 text-sm break-all text-center">
          <span className="font-semibold">🔑 Generated Password:</span><br />
          <span className="text-lg font-mono">{generatedPassword}</span>
        </div>
      )}
    </div>
  );
};

export default Task4;
