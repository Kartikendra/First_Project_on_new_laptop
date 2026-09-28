import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskRequest } from "../redux/taskSlice";
import { AppDispatch } from "../redux/store";
import { TextField, Button } from "@mui/material";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (title.trim()) {
      dispatch(addTaskRequest({ title, completed: false }));
      setTitle("");
    }
  };

  return (
    <div>
      <TextField
        label="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="contained">
        Add
      </Button>
    </div>
  );
}
