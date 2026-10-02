import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import TaskPage from "./pages/TaskPage";
import MemoryGamePage from "./pages/MemoryGamePage";
import SnippetShelfPage from "./pages/SnippetShelfPage";
import "./App.css";

export default function App() {
  return (
    <div className="app-frame">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/projects/memory-match" element={<MemoryGamePage />} />
        <Route path="/projects/snippet-shelf" element={<SnippetShelfPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
