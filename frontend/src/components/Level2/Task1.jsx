import React, { useState, useEffect } from "react";

const Task1 = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tic-tac-toe/board`);
      const data = await response.json();

      if (Array.isArray(data) && data.every((row) => Array.isArray(row))) {
        setBoard(data);
      } else {
        console.error("Invalid board data received:", data);
      }
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };

  const resetGame = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/tic-tac-toe/reset`, {
        method: "POST",
      });
      setMessage("Game Reset! Start a new game.");
      setGameOver(false);
      fetchBoard();
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

  const makeMove = async (row, col) => {
    if (gameOver || board[row][col] !== "") return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tic-tac-toe/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row, col }),
      });

      const data = await response.text();
      setMessage(data);

      if (data.includes("wins") || data.includes("draw")) {
        setGameOver(true);
      }

      fetchBoard();
    } catch (error) {
      console.error("Error making move:", error);
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-800 rounded-lg text-white border border-gray-700 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-blue-400 text-center">🎮 Tic-Tac-Toe Game</h3>

      <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300">
        <p>
          This task is an interactive two-player Tic-Tac-Toe game. Players alternate turns by clicking the cells.
          The backend handles the game logic, move validation, and winner detection. Click "Reset Game" to start over anytime.
        </p>
      </div>

      <p className="mb-4 text-yellow-400 text-center font-medium">{message}</p>

      <div className="grid grid-cols-3 gap-2 justify-center mx-auto w-fit">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-20 h-20 text-3xl font-bold rounded flex items-center justify-center border-2 border-gray-500
                ${cell === "X" ? "bg-blue-500 text-white" :
                  cell === "O" ? "bg-red-500 text-white" : "bg-gray-700 text-white"}`}
              onClick={() => makeMove(rowIndex, colIndex)}
              disabled={cell !== ""}
            >
              {cell}
            </button>
          ))
        )}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
      >
        🔄 Reset Game
      </button>
    </div>
  );
};

export default Task1;
