
import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const noteContextTemp = useContext(noteContext);
    const { deleteNote } = noteContextTemp;

    const { note } = props;
    return (
        <div className="col-md-3" >
            <div className="card my-3">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <img src='./delete-icon.png' className="mx-1" alt='delete' height={20} onClick={ ()=>{deleteNote(note._id)}}/>
                    <img src='./edit-icon.png' className="mx-1" alt='edit' height={20} />
                </div>
                <p className="card-text"> {note.description}</p>
            </div>
        </div>
    )
}

export default NoteItem