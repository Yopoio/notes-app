import React from "react";
import NotesItem from "./NotesItem";

const NotesList = ({ notesList, onDelete, onArchive }) => {
    return (
        <>
            {notesList.length !== 0 ?
                <div className="notes-list">
                    {
                        notesList.map(item => (
                            <NotesItem key={item.id} note={item} onDelete={onDelete} onArchive={onArchive} />
                        ))
                    }
                </div> :
                <p className="notes-list__empty-message">Nothing here</p>
            }
        </>
    )
}

export default NotesList;