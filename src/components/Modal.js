import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "./Modal.css";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const Modal = ({ showModal, setShowModal, todos, setTodos }) => {
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  const createTodo = () => {
    
    if(todoName === "" || todoDesc === ""){
      toast.error("Fields are Empty!")
      return
    }

    const todoObj = {
      id: v4(),
      name: todoName,
      description: todoDesc,
      status: true
    }

    setTodos([...todos, todoObj])
    toast.success("task is assigned...")
    setTodoDesc("");
    setTodoName("");
  }

  return showModal ? (
    <div className="createTaskModalBg">
      <div className="modalWrapper">
        <h1>Create Task</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={6}
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
          />
          <Button variant="contained" style={{ background: "#8D3DAF" }} onClick={createTodo}>
            Create
          </Button>
        </Box>
        <div className="closeModal">
          <Close onClick={() => setShowModal((prev) => !prev)} />{" "}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
