import { Link } from "react-router-dom";

const projects = [
  {
    number: "01",
    category: "PRODUCTIVITY · REDUX",
    name: "TaskFlow",
    summary: "A task manager with async loading, Redux state, and completion tracking.",
    stack: ["React", "Redux Toolkit", "Redux Saga"],
    to: "/tasks",
    action: "Open app",
    className: "project-taskflow",
  },
  {
    number: "02",
    category: "GAME · INTERACTION",
    name: "Memory Match",
    summary: "A quick pair-finding game with shuffled cards, move tracking, and a timer.",
    stack: ["React state", "Effects", "CSS grid"],
    to: "/projects/memory-match",
    action: "Play game",
    className: "project-memory",
  },
  {
    number: "03",
    category: "DEVELOPER TOOL · SEARCH",
    name: "Snippet Shelf",
    summary: "A searchable pocket library of useful React and JavaScript patterns.",
    stack: ["React", "Filtering", "Clipboard API"],
    to: "/projects/snippet-shelf",
    action: "Browse snippets",
    className: "project-snippets",
  },
];

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">SELECTED WORK</p>
        <h1>Projects</h1>
        <p className="page-description">Three small builds, each exploring a different part of React.</p>
      </section>
      <div className="project-list">
        {projects.map((project) => (
          <article className={`project-row ${project.className}`} key={project.number}>
            <span className="project-count">{project.number}</span>
            <div className="project-details">
              <p className="eyebrow">{project.category}</p>
              <h2>{project.name}</h2>
              <p>{project.summary}</p>
              <div className="tag-list">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <Link className="button button-outline" to={project.to}>
              {project.action}<span aria-hidden="true"> ↗</span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}