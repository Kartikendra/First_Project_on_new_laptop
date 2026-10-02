import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TaskPage() {
  return (
    <main className="page-shell task-page">
      <section className="page-heading">
        <p className="eyebrow">PROJECT · PRODUCTIVITY</p>
        <h1>TaskFlow</h1>
        <p className="page-description">Keep the next thing moving.</p>
      </section>
      <div className="task-workspace">
        <TaskForm />
        <TaskList />
      </div>
    </main>
  );
}