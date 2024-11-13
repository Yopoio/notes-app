import React, { useState } from "react";

const NotesInput = ({ addNewNote }) => {
    const [formData, setFormData] = useState({
        noteTitle: '',
        noteTitleLength: 0,
        noteBody: '',
        error: ''
    });

    const onTitleChange = (event) => {
        event.preventDefault();
        if (event.target.value.length <= 50) {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
                noteTitleLength: event.target.value.length,
                error: ''
            });
        } else {
            setFormData({
                ...formData,
                error: 'Max length for note title is 50'
            });
        }
    }

    const onBodyChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
            error: ''
        });
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (formData.noteTitle === '' && formData.noteBody === '') {
            setFormData({
                ...formData,
                error: 'Note title and note body cannot be empty!'
            });
        } else if (formData.noteTitle === '') {
            setFormData({
                ...formData,
                error: 'Note title cannot be empty!'
            });
        } else if (formData.noteBody === '') {
            setFormData({
                ...formData,
                error: 'Note body cannot be empty!'
            });
        } else {
            const newData = {
                id: +new Date(),
                title: formData.noteTitle,
                body: formData.noteBody,
                archived: false,
                createdAt: new Date(),
            }
            const result = addNewNote(newData);
            if (!result.error) {
                setFormData({
                    noteTitle: '',
                    noteBody: '',
                    noteBodyLength: 0,
                    error: ''
                });
            } else {
                setFormData({
                    ...formData,
                    error: 'New note failed to save!'
                });
            }
        }
    }

    return (
        <div className="note-input">
            <h2>New Notes</h2>
            <form>
                {formData.error && <p className="error-message">{formData.error}</p>}
                <p className="note-input__title__char-limit">Character left: {50 - formData.noteTitleLength}</p>
                <input
                    className="note-input__title"
                    type="text"
                    name="noteTitle"
                    placeholder="Title..."
                    required
                    value={formData.title}
                    onChange={onTitleChange}
                />
                <textarea
                    className="note-input__body"
                    type="text"
                    name="noteBody"
                    placeholder="Start Typing..."
                    required
                    value={formData.noteBody}
                    onChange={onBodyChange}
                ></textarea>
                <button type="submit" className="create-btn" onClick={onSubmitForm}>Create</button>
            </form>
        </div>
    )
}

export default NotesInput;