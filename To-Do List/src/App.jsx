import './App.css'
import { useState } from 'react'
import { FaTrash, FaCheck } from "react-icons/fa";

function App() {

  const today = new Date();
  const date = today.getDate();
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(today);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(today);

  const [todoList, setTodoList] = useState([
    { id: 1, text: "Enter the task you are planning to do", time: "", completed: false }
  ]);

  const pendingCount = todoList.filter((todo) => !todo.completed).length;
  const getStatusMessage = () => {
    if (todoList.length === 0) return "No tasks yet! Add one above.";
    if (pendingCount === 0) return "🎉 All tasks completed!";
    return `${pendingCount} task${pendingCount > 1 ? 's' : ''} remaining`;
  };

  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = task.trim();
    if (!text) return;

    const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTodoList([
      ...todoList,
      {
        id:Date.now(),
        text: text,
        time: newTime,
        completed: false
      }
    ]);
    setTask("");
  };

  const handleComplete = (id) => {
    const updatedList = todoList.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

    const targetTask = updatedList.find((todo) => todo.id === id);

    if (targetTask.completed) {
      const remainingTasks = updatedList.filter((todo) => todo.id !== id);
      setTodoList([...remainingTasks, targetTask]);
    } else {
      setTodoList(updatedList);
    }
  };

  const handleDelete = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div id="main-container">
      <div className="head">
        <div className="heading">
          <h1>Your To-Do List</h1>
          <div className="date">{weekday},{date} {month}</div>
        </div>
        <div id="taskstatus">{getStatusMessage()}</div>
      </div>

      <form id="newtask" onSubmit={handleSubmit}>
        <input id="task" type="text" placeholder="Add a new task..." autoComplete="off"
          value={task} onChange={(e) => setTask(e.target.value)}>
        </input>
        <button type="submit" id="addbutton">Add Task</button>
      </form>

      <ul className="todos">
        {todoList.map((todo) => {
          return (
            <li key={todo.id} className="todo-item">
              <div onClick={() => handleComplete(todo.id)}>
                {todo.completed ? (
                  <div className="done"><FaCheck /></div>
                ) : (
                  <div className="notdone"></div>
                )}
              </div>
              <div className="taskcontent">
                <div className={`task-text ${todo.completed ? "completed" : ""}`}>
                  {todo.text}
                </div>
                <div className="tasktime">{todo.time}</div>
              </div>
              <div className="deletetask" onClick={() => handleDelete(todo.id)}>
                <FaTrash />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App