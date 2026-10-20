import { useState } from "react";

export const COLORS = ["#fff8c5", "#d8f0e0", "#dbe8fb", "#fde0dc", "#ece2f7"];

export default function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [color, setColor] = useState(note?.color || COLORS[0]);

  const submit = () => {
    if (!title.trim()) return;
    onSave({ title, content, color });
    if (!note) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="form" style={{ background: color }}>
      <input
        className="title-input"
        placeholder="Title"
        value={title}
        maxLength={120}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Note title"
      />
      <textarea
        placeholder="Write your note…"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Note content"
      />
      <div className="form-bar">
        <div className="swatches" role="radiogroup" aria-label="Note color">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              role="radio"
              aria-checked={c === color}
              aria-label={`Color ${c}`}
              className={c === color ? "swatch active" : "swatch"}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <div className="actions">
          {note && (
            <button type="button" className="btn ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="button" className="btn" onClick={submit} disabled={!title.trim()}>
            {note ? "Save changes" : "Add note"}
          </button>
        </div>
      </div>
    </div>
  );
}
