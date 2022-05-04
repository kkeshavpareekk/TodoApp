import { Add, RestartAlt } from "@mui/icons-material";
import "./App.css";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos.length > 0) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  const resetTodos = () => {
    localStorage.removeItem("todos");
    setTodos([]);
  };

  const assignedTasks = todos.filter((todo) => todo.status === true);
  const completedTasks = todos
    .filter((todo) => todo.status === false)
    .sort((a, b) => {
      return b.completedAt - a.completedAt;
    });

  return (
    <div className="mainSection">
      <ToastContainer />
      <div className="header">
        <h1>Todo App</h1>
        <div
          className="createTodobtn"
          onClick={() => {
            setShowModal((prev) => !prev);
          }}
        >
          <button>Create Todo</button>
          <Add />
        </div>
        <div className="resetbtn" onClick={resetTodos}>
          Reset <RestartAlt />
        </div>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
      <div className="assignedTasks">
        <h2>Assigned Tasks</h2>
        <div className="Cards">
          {assignedTasks.length > 0 &&
            assignedTasks.map((todo) => (
              <TaskCard
                data={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
        </div>
      </div>
      <div className="completedTasks">
        <h2>Completed Tasks</h2>
        <div className="Cards">
          {completedTasks.length > 0 &&
            completedTasks.map((todo) => (
              <TaskCard
                data={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
