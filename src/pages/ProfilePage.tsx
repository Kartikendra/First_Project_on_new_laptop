import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface ProfileDetails {
  name: string;
  headline: string;
  email: string;
  location: string;
}

const emptyProfile: ProfileDetails = {
  name: "",
  headline: "",
  email: "",
  location: "",
};

function getSavedProfile(): ProfileDetails {
  try {
    const saved = localStorage.getItem("developer-profile");
    return saved ? { ...emptyProfile, ...JSON.parse(saved) } : emptyProfile;
  } catch {
    return emptyProfile;
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(getSavedProfile);
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem("developer-profile", JSON.stringify(draft));
    setProfile(draft);
    setEditing(false);
  }

  function cancelEditing() {
    setDraft(profile);
    setEditing(false);
  }

  return (
    <main className="page-shell">
      <section className="profile-intro" aria-labelledby="profile-title">
        <div className="profile-copy">
          <p className="eyebrow">DEVELOPER PROFILE</p>
          <h1 id="profile-title">{profile.name || "Your name here"}</h1>
          <p className="profile-headline">
            {profile.headline || "Developer · Building thoughtful software"}
          </p>
          {profile.location && <p className="profile-location">{profile.location}</p>}
          {profile.email && (
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          )}
        </div>
        <div className="profile-actions">
          <span className="availability"><span /> Open to opportunities</span>
          <button
            className="button button-outline"
            onClick={() => {
              setDraft(profile);
              setEditing(true);
            }}
          >
            Edit profile
          </button>
        </div>
      </section>

      {editing && (
        <form className="profile-editor" onSubmit={saveProfile}>
          <label className="field-label">
            Name
            <input className="text-input" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
          </label>
          <label className="field-label">
            Headline
            <input className="text-input" value={draft.headline} onChange={(event) => setDraft({ ...draft, headline: event.target.value })} />
          </label>
          <label className="field-label">
            Email
            <input className="text-input" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
          </label>
          <label className="field-label">
            Location
            <input className="text-input" value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} />
          </label>
          <div className="editor-actions">
            <button className="button button-quiet" type="button" onClick={cancelEditing}>Cancel</button>
            <button className="button button-primary" type="submit">Save profile</button>
          </div>
        </form>
      )}

      <section className="content-section" aria-labelledby="stack-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TOOLS OF THE TRADE</p>
            <h2 id="stack-heading">Technical stack</h2>
          </div>
          <span className="section-index">01 / 03</span>
        </div>
        <div className="stack-grid">
          <article className="stack-item">
            <span className="stack-number">01</span>
            <h3>Frontend</h3>
            <p>React · TypeScript · CSS</p>
          </article>
          <article className="stack-item">
            <span className="stack-number">02</span>
            <h3>State &amp; data</h3>
            <p>Redux Toolkit · Redux Saga</p>
          </article>
          <article className="stack-item">
            <span className="stack-number">03</span>
            <h3>Tooling</h3>
            <p>Vite · ESLint · Git</p>
          </article>
        </div>
      </section>

      <section className="featured-project" aria-labelledby="featured-heading">
        <div>
          <p className="eyebrow">CURRENT PROJECT</p>
          <h2 id="featured-heading">TaskFlow</h2>
          <p>A focused task manager built with React, Redux, and Saga.</p>
        </div>
        <Link className="button button-primary" to="/tasks">
          Open project
        </Link>
      </section>

      <footer className="profile-footer">
        <span>Profile workspace</span>
        <Link to="/projects">View projects <span aria-hidden="true">↗</span></Link>
      </footer>
    </main>
  );
}