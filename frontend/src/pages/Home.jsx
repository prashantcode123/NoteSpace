import { useEffect, useState } from "react";
import { Plus, Search, StickyNote, RefreshCw } from "lucide-react";

import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // FETCH NOTES
  const fetchNotes = async () => {
    try {
      setError("");
      setLoading(true);

      const data = await getNotes();
      setNotes(data.notes || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load notes. Check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // OPEN CREATE FORM
  const handleCreate = () => {
    setSelectedNote(null);
    setShowForm(true);
  };

  // OPEN EDIT FORM
  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowForm(true);
  };

  // SAVE NOTE
  const handleSave = async (noteData) => {
    try {
      setSaving(true);
      setError("");

      if (selectedNote) {
        await updateNote(selectedNote._id, noteData);
      } else {
        await createNote(noteData);
      }

      setShowForm(false);
      setSelectedNote(null);

      await fetchNotes();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to save note."
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE NOTE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteNote(id);

      setNotes((prev) =>
        prev.filter((note) => note._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete note."
      );
    }
  };

  // CLOSE FORM
  const handleCancel = () => {
    setShowForm(false);
    setSelectedNote(null);
  };

  // SEARCH NOTES
  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <StickyNote size={23} />
          </div>

          <h2>NoteSpace</h2>
        </div>

        <span className="navbar-label">
          Personal Workspace
        </span>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* PAGE HEADER */}
        <section className="page-header">
          <div>
            <span className="eyebrow">
              YOUR PERSONAL SPACE
            </span>

            <h1>Your Notes</h1>

            <p>
              Capture your thoughts, ideas and important things.
            </p>
          </div>

          <button
            className="create-btn"
            onClick={handleCreate}
          >
            <Plus size={19} />
            Create Note
          </button>
        </section>

        {/* STATS */}
        <section className="stats-card">
          <div className="stats-icon">
            <StickyNote size={22} />
          </div>

          <div>
            <h3>{notes.length}</h3>
            <p>Total Notes</p>
          </div>
        </section>

        {/* SEARCH */}
        <section className="search-section">
          <div className="search-box">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search your notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="refresh-btn"
            onClick={fetchNotes}
            disabled={loading}
            aria-label="Refresh notes"
          >
            <RefreshCw size={18} />
          </button>
        </section>

        {/* ERROR */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* NOTES SECTION */}
        <section className="notes-section">

          <div className="section-heading">
            <h2>All Notes</h2>
            <span>{filteredNotes.length} notes</span>
          </div>

          {loading ? (
            <div className="empty-state">
              Loading notes...
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <StickyNote size={42} />

              <h3>
                {search ? "No matching notes" : "No notes yet"}
              </h3>

              <p>
                {search
                  ? "Try searching with another keyword."
                  : "Create your first note and start writing."}
              </p>

              {!search && (
                <button
                  className="create-btn"
                  onClick={handleCreate}
                >
                  <Plus size={18} />
                  Create Your First Note
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      {/* CREATE / EDIT FORM */}
      {showForm && (
        <div className="modal-overlay">
          <NoteForm
            note={selectedNote}
            onSave={handleSave}
            onCancel={handleCancel}
            saving={saving}
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        Made with React & MERN Stack
      </footer>

    </div>
  );
}

export default Home;