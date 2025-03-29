import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

const Task2 = () => {
    const [password, setPassword] = useState("");
    const [strengthMessage, setStrengthMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

    const checkPasswordStrength = async () => {
        if (!password) {
            setStrengthMessage("Please enter a password.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password-checker/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const result = await response.text();
            setStrengthMessage(result);
        } catch (error) {
            console.error("Error:", error);
            setStrengthMessage("Error checking password strength.");
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 w-96 mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-2 text-blue-400 text-center">🔐 Password Strength Checker</h2>

            <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300">
                <p>
                    This task analyzes the strength of your password using backend validation logic. It checks for length, complexity,
                    and use of characters to give a rating like Weak, Moderate, or Strong. You can toggle password visibility for better control.
                </p>
            </div>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <button
                onClick={checkPasswordStrength}
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
            >
                Check Strength
            </button>

            {strengthMessage && (
                <p className="mt-4 text-lg font-medium text-yellow-400 text-center">{strengthMessage}</p>
            )}
        </div>
    );
};

export default Task2;
