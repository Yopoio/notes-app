import React from "react";
import NotesSearch from "./NotesSearch";

const NotesHeader = ({ onSearch }) => {
    return (
        <div className="note-app__header">
            <h1>Notes</h1>
            <NotesSearch onSearch={onSearch} />
        </div>
    )
}

export default NotesHeader;