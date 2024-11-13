import React from "react";
import NotesHeader from "./NotesHeader";
import NotesBody from "./NotesBody";
import NotesFooter from "./NotesFooter";
import { getInitialData } from "../utils/index";

class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),
            unfilteredNotes: getInitialData(),
            notification: {
                type: null,
                message: '',
            }
        };
    }

    addNewNoteHandler = (newNoteData) => {
        try {
            this.setState((prevState) => {
                return {
                    notes: [newNoteData, ...prevState.notes],
                    unfilteredNotes: [newNoteData, ...prevState.unfilteredNotes],
                    notification: {
                        type: 'success',
                        message: 'Create Note Success!',
                    }
                };
            });
        } catch (error) {
            this.setState({
                notification: {
                    type: 'error',
                    message: 'Failed!',
                }
            });
        }
    }

    onDeleteHandler = (id) => {
        const result = window.confirm('Are you sure you want to delete this?');
        if (result) {
            this.setState((prevState) => {
                return {
                    notes: prevState.notes.filter((note) => note.id !== id),
                    unfilteredNotes: prevState.unfilteredNotes.filter((note) => note.id !== id),
                    notification: {
                        type: 'success',
                        message: 'Notes deleted!',
                    }
                };
            });
        } else {
            this.setState({
                notification: {
                    type: 'error',
                    message: 'Deletion cancelled!',
                }
            });
        }
    }

    onArchiveHandler = (id) => {
        const noteToModify = this.state.unfilteredNotes.find((note) => note.id === id);
        const modifiedNote = { ...noteToModify, archived: !noteToModify.archived };
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes.filter((note) => note.id !== id),
                    modifiedNote
                ],
                unfilteredNotes: [
                    ...prevState.unfilteredNotes.filter((note) => note.id !== id),
                    modifiedNote
                ],
                notification: {
                    type: 'success',
                    message: noteToModify.archived ? 'Note moved to active!' : 'Note archived!',
                }
            };
        });
    }

    onSearchHandler = (text) => {
        if (text.length !== 0 && text.trim() !== '') {
            this.setState({
                notes: this.state.unfilteredNotes.filter((note) =>
                    note.title.toLowerCase().includes(text.toLowerCase())
                )
            });
        } else {
            this.setState({
                notes: this.state.unfilteredNotes
            });
        }
    }

    render() {
        const { notification } = this.state;

        return (
            <div>
                <NotesHeader onSearch={this.onSearchHandler} />
                <NotesBody
                    notes={this.state.notes}
                    addNewNote={this.addNewNoteHandler}
                    onDelete={this.onDeleteHandler}
                    onArchive={this.onArchiveHandler}
                />
                {notification.type === 'success' && (
                    <div className="notification success">{notification.message}</div>
                )}
                {notification.type === 'error' && (
                    <div className="notification error">{notification.message}</div>
                )}
                <NotesFooter />
            </div>
        );
    }
}

export default NotesApp;
