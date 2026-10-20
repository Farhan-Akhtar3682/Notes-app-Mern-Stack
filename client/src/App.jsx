import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import NoteForm from "./NoteForm.jsx";
import NoteCard from "./NoteCard.jsx";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // search with small debounce
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        setError("");
        setNotes(await getNotes(query));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  const refresh = async () => setNotes(await getNotes(query));

  const handleSave = async (data) => {
    try {
      if (editing) await updateNote(editing._id, data);
      else await createNote(data);
      setEditing(null);
      await refresh();
    } catch (e) {
      setError(e.message);
    }
  };

  const handlePin = async (note) => {
    await updateNote(note._id, { pinned: !note.pinned });
    refresh();
  };

  const handleDelete = async (note) => {
    if (!confirm(`Delete "${note.title}"?`)) return;
    await deleteNote(note._id);
    if (editing?._id === note._id) setEditing(null);
    refresh();
  };

  return (
    <div className="app">
      <header>
        <h1>Notes</h1>
        <input
          className="search"
          type="search"
          placeholder="Search notes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </header>

      <NoteForm
        key={editing?._id || "new"}
        note={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      {error && <p className="error" role="alert">{error}</p>}
      {loading && <p className="muted">Loading notes…</p>}
      {!loading && notes.length === 0 && (
        <p className="muted">
          {query ? "No notes match your search." : "No notes yet. Write your first one above."}
        </p>
      )}

      <div className="grid">
        {notes.map((n) => (
          <NoteCard
            key={n._id}
            note={n}
            onEdit={() => {
              setEditing(n);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onPin={() => handlePin(n)}
            onDelete={() => handleDelete(n)}
          />
        ))}
      </div>
    </div>
  );
}
