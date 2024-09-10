import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const Incident = () => {
  const location = useLocation();
  const userRole = location.state?.userRole || "vendor"; // Default to "vendor" if no role is passed

  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, title: "Assess damage reports", description: "Review initial damage reports from various sources.", status: "todo" },
      { id: 2, title: "Verify incident details", description: "Confirm details of reported incidents with local authorities.", status: "todo" },
      { id: 3, title: "Coordinate with response teams", description: "Ensure coordination with disaster response teams.", status: "todo" },
      { id: 4, title: "Update incident status", description: "Regularly update the status of ongoing incidents.", status: "todo" }
    ],
    inProgress: [],
    inReview: [],
    completed: []
  });

  const moveTask = (taskId, newStatus) => {
    const taskToMove = Object.values(tasks).flat().find(task => task.id === taskId);
    if (!taskToMove) return;

    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach(status => {
      updatedTasks[status] = updatedTasks[status].filter(task => task.id !== taskId);
    });

    taskToMove.status = newStatus;
    updatedTasks[newStatus].push(taskToMove);
    setTasks(updatedTasks);
  };

  const canMoveTask = (task, newStatus) => {
    if (userRole === "vendor") {
      // Vendor can move tasks from "todo" to "inProgress" and from "inProgress" to "inReview"
      return (
        (task.status === "todo" && newStatus === "inProgress") ||
        (task.status === "inProgress" && newStatus === "inReview")
      );
    } else if (userRole === "moderator") {
      // Moderator can only move tasks from "inReview" to "completed"
      return task.status === "inReview" && newStatus === "completed";
    }
    return false;
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Disaster Pending Requests</h1>
      <div className="flex flex-wrap gap-6">
        
        {/* To-do Tasks */}
        <TaskColumn title="Pending Requests" tasks={tasks.todo} onChangeStatus={moveTask} newStatus="inProgress" canMoveTask={canMoveTask} />
        
        {/* In Progress Tasks */}
        <TaskColumn title="In Progress Requests" tasks={tasks.inProgress} onChangeStatus={moveTask} newStatus="inReview" canMoveTask={canMoveTask} />
        
        {/* In Review Tasks */}
        <TaskColumn title="In Review Requests" tasks={tasks.inReview} onChangeStatus={moveTask} newStatus="completed" canMoveTask={canMoveTask} />
        
        {/* Completed Tasks */}
        <TaskColumn title="Completed Requests" tasks={tasks.completed} />
        
      </div>
    </div>
  );
};

const TaskColumn = ({ title, tasks, onChangeStatus, newStatus, canMoveTask }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 flex-1 min-w-[250px]">
      <h2 className="text-xl font-semibold mb-4 text-green-600">{title}</h2>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-green-700">{task.title}</h3>
              <p className="text-sm text-gray-700">{task.description}</p>
              {onChangeStatus && newStatus && canMoveTask(task, newStatus) && (
                <button 
                  onClick={() => onChangeStatus(task.id, newStatus)} 
                  className="text-green-500 text-sm mt-2 underline"
                >
                  Move to {newStatus.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v1H5V7h14v11h-4v-1m-6 0h6m-6-6h6"></path>
            </svg>
            <p>No tasks in {title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Incident;
