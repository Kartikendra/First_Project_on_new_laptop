import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTaskRequest } from "../redux/taskSlice";
import { AppDispatch } from "../redux/store";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.trim()) {
      dispatch(addTaskRequest({ title: title.trim(), completed: false }));
      setTitle("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">New task</label>
      <input
        id="new-task"
        className="text-input"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="button button-primary" type="submit">Add task</button>
    </form>
  );
}
