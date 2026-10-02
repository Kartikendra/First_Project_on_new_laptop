import { useState } from "react";

const snippets = [
  {
    title: "Debounce a value",
    category: "React",
    description: "Delay updates until input has settled.",
    code: `useEffect(() => {\n  const timer = setTimeout(() => setDebounced(value), 300);\n  return () => clearTimeout(timer);\n}, [value]);`,
  },
  {
    title: "Group an array",
    category: "JavaScript",
    description: "Build a lookup by a chosen property.",
    code: `const grouped = items.reduce((groups, item) => {\n  (groups[item.type] ??= []).push(item);\n  return groups;\n}, {});`,
  },
  {
    title: "Typed event handler",
    category: "TypeScript",
    description: "Keep form submit events strongly typed.",
    code: `function handleSubmit(event: FormEvent<HTMLFormElement>) {\n  event.preventDefault();\n  // submit form values\n}`,
  },
];

export default function SnippetShelfPage() {
  const [query, setQuery] = useState("");
  const [copiedTitle, setCopiedTitle] = useState("");
  const filteredSnippets = snippets.filter((snippet) =>
    `${snippet.title} ${snippet.category} ${snippet.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  async function copySnippet(title: string, code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTitle(title);
      window.setTimeout(() => setCopiedTitle(""), 1600);
    } catch {
      setCopiedTitle("Clipboard unavailable");
    }
  }

  return (
    <main className="page-shell snippets-page">
      <section className="page-heading">
        <p className="eyebrow">PROJECT 03 · DEVELOPER TOOL</p>
        <h1>Snippet Shelf</h1>
        <p className="page-description">Small patterns worth keeping close.</p>
      </section>
      <label className="snippet-search-label" htmlFor="snippet-search">Search snippets</label>
      <input
        className="text-input snippet-search"
        id="snippet-search"
        type="search"
        placeholder="Try React, array, or TypeScript"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="snippet-list">
        {filteredSnippets.map((snippet) => (
          <article className="snippet-card" key={snippet.title}>
            <div className="snippet-card-heading">
              <div>
                <span className="snippet-category">{snippet.category}</span>
                <h2>{snippet.title}</h2>
                <p>{snippet.description}</p>
              </div>
              <button
                className="button button-outline"
                type="button"
                onClick={() => copySnippet(snippet.title, snippet.code)}
                aria-label={`Copy ${snippet.title} snippet`}
              >
                {copiedTitle === snippet.title ? "Copied" : "Copy"}
              </button>
            </div>
            <pre><code>{snippet.code}</code></pre>
          </article>
        ))}
        {filteredSnippets.length === 0 && <p className="empty-state">No snippets match that search.</p>}
      </div>
      <p className="copy-status" aria-live="polite">
        {copiedTitle === "Clipboard unavailable" ? copiedTitle : ""}
      </p>
    </main>
  );
}