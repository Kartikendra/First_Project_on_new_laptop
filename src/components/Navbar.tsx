import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <NavLink className="brand" to="/" end>
          <span className="brand-mark">D</span>
          <span>Devfolio</span>
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>Profile</NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </nav>
      </div>
    </header>
  );
}
