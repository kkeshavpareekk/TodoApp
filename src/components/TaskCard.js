import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Delete } from "@mui/icons-material";
import {toast} from "react-toastify"

const TaskCard = ({ data, todos, setTodos }) => {
  const deleteTodo = (Id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== Id);
    if (filteredTodos.length === 0) {
      localStorage.removeItem("todos");
    }
    setTodos(filteredTodos);
    toast.success("task is successfully deleted..");
  };

  const markComplete = (Id) => {
    todos.map((todo) => {
      if (todo.id === Id) {
        todo.status = false;
        todo.completedAt = Date.now();
      }
    });
    setTodos([...todos]);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          style={{ color: "red" }}
          onClick={() => deleteTodo(data.id)}
        >
          <Delete />
        </Button>
        <Button onClick={() => markComplete(data.id)}>
          {data.status ? "Mark Complete" : "Completed"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
