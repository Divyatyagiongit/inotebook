import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { AddNotes } from './AddNotes';

const Notes = () => {

    const noteContextTemp = useContext(noteContext);
    const { notes, addNote } = noteContextTemp;

    return (
        <>
            <AddNotes />
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {
                    notes.map(
                        (notes) => {
                            return <NoteItem key={notes._id} note={notes} />
                        }
                    )
                }
            </div>
        </>
    )
}

export default Notes