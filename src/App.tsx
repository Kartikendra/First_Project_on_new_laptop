import React from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Container, Typography } from "@mui/material";

export default function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        TaskFlow
      </Typography>
      <TaskForm />
      <TaskList />
    </Container>
  );
}
