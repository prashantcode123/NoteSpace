import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

function NoteForm({ note, onSave, onCancel, saving }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      content,
    });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{note ? "Edit Note" : "Create New Note"}</h2>

        <button
          type="button"
          className="icon-btn"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X size={20} />
        </button>
      </div>

      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={120}
        required
      />

      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
      />

      <div className="form-footer">
        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-btn"
          disabled={saving || !title.trim()}
        >
          <Save size={17} />
          {saving ? "Saving..." : "Save Note"}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;