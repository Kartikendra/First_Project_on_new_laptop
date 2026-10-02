import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksRequest, toggleTask } from "../redux/taskSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  if (loading) return <p className="loading-state">Loading tasks...</p>;

  return (
    <ul className="task-list">
      {list.map((task) => (
        <li className="task-row" key={task.id}>
          <label className={task.completed ? "task-label is-complete" : "task-label"}>
            <input
              className="task-checkbox"
              type="checkbox"
              onChange={() => dispatch(toggleTask(task.id))}
              checked={task.completed}
            />
            <span>{task.title}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
