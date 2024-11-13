import React from "react";

const NotesSearch = ({ onSearch }) => {

    const onSearchbarChange = (event) => {
        onSearch(event.target.value);
    } 

    return (
        <div className="note-search">
            <input 
                type="text" 
                placeholder="Search Notes..."
                onChange={onSearchbarChange}
            />
        </div>
    )
}

export default NotesSearch;