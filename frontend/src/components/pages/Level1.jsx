import React, { useState } from "react";
import Task1 from "../Level1/Task1";
import Task2 from "../Level1/Task2";
import Task3 from "../Level1/Task3";
import Task4 from "../Level1/Task4";

const Level1 = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-6 text-blue-400">Level 1</h2>
      <p className="text-gray-300 text-lg">Select a task to get started.</p>

      <div className="flex gap-4 justify-center mt-4">
        {["Task 1", "Task 2", "Task 3", "Task 4"].map((task, index) => (
          <button
            key={index}
            onClick={() => setSelectedTask(`task${index + 1}`)}
            className="mt-4 p-4 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition"
          >
            {task}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {selectedTask === "task1" && <Task1 />}
        {selectedTask === "task2" && <Task2 />}
        {selectedTask === "task3" && <Task3 />}
        {selectedTask === "task4" && <Task4 />}
      </div>
    </div>
  );
};

export default Level1;
