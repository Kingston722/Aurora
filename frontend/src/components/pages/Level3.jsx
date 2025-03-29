import React, { useState } from "react";
import Task4 from "../Level3/Task4";

const Level3 = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-6 text-green-400">Level 3</h2>
      <p className="text-gray-300 text-lg">Select a task to get started.</p>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setSelectedTask("task4")}
          className="mt-4 p-4 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition"
        >
          Task 4
        </button>
      </div>

      <div className="mt-6">
        {selectedTask === "task4" && <Task4 />}
      </div>
    </div>
  );
};

export default Level3;
