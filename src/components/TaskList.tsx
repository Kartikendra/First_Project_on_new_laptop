import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksRequest, Task } from "../redux/taskSlice";
import { RootState, AppDispatch } from "../redux/store";
import { CircularProgress, List, ListItem, Checkbox } from "@mui/material";

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <List>
      {list.map((task: Task) => (
        <ListItem key={task.id}>
          <Checkbox checked={task.completed} />
          {task.title}
        </ListItem>
      ))}
    </List>
  );
}
