import React from "react";
import NotesList from "./NotesList";
import NotesInput from "./NotesInput";

const NotesBody = ({ notes, addNewNote, onDelete, onArchive }) => {
    return (
        <div className="note-app__body">
            <NotesInput addNewNote={addNewNote} />

            <h2>Active Notes</h2>
            <NotesList notesList={notes.filter(note => !note.archived)} onDelete={onDelete} onArchive={onArchive} />

            <h2>Note Archive</h2>
            <NotesList notesList={notes.filter(note => note.archived)} onDelete={onDelete} onArchive={onArchive} />
        </div>
    );
}

export default NotesBody;