import { Pencil, Trash2, FileText } from "lucide-react";

function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(
    note.updatedAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="note-card">
      <div className="note-card-header">
        <div className="note-icon">
          <FileText size={20} />
        </div>

        <div className="note-actions">
          <button
            className="icon-btn"
            onClick={() => onEdit(note)}
            aria-label="Edit note"
          >
            <Pencil size={17} />
          </button>

          <button
            className="icon-btn delete-icon"
            onClick={() => onDelete(note._id)}
            aria-label="Delete note"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <h3>{note.title}</h3>

      <p className="note-content">
        {note.content || "No description added."}
      </p>

      <div className="note-date">
        Last updated: {formattedDate}
      </div>
    </article>
  );
}

export default NoteCard;