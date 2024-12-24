import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {

    const noteContextTemp = useContext (noteContext);
    const {notes,setNotes} = noteContextTemp;

    return (
        <div className='row my-3'>
            <h2>Your Notes</h2>
            {
                notes.map(
                    (notes) => {
                        return <NoteItem note={notes}/>
                    }
                )
            }
        </div>
    )
}

export default Notes