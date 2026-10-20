export default function NoteCard({ note, onEdit, onPin, onDelete }) {
  const date = new Date(note.updatedAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className={note.pinned ? "card pinned" : "card"} style={{ background: note.color }}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <footer>
        <span className="muted">{date}</span>
        <div className="actions">
          <button className="link" onClick={onPin}>{note.pinned ? "Unpin" : "Pin"}</button>
          <button className="link" onClick={onEdit}>Edit</button>
          <button className="link danger" onClick={onDelete}>Delete</button>
        </div>
      </footer>
    </article>
  );
}
