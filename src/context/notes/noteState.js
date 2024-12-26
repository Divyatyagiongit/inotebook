import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial =
    [
      {
        "_id": "67619f3a094f1957d9eabcef",
        "user": "675d42825407ede0b70b2ab9",
        "title": "Title2",
        "description": "This is description which change according to title2",
        "tag": "personal",
        "__v": 0
      },
      {
        "_id": "67619f3a094f1957d9eabcef0",
        "user": "675d42825407ede0b70b2ab9",
        "title": "Title2",
        "description": "This is description which change according to title2",
        "tag": "personal",
        "__v": 0
      },
      {
        "_id": "67619f3a094f1957d9eabcef1",
        "user": "675d42825407ede0b70b2ab9",
        "title": "Title2",
        "description": "This is description which change according to title2",
        "tag": "personal",
        "__v": 0
      },
      {
        "_id": "67619f3a094f1957d9eabcef2",
        "user": "675d42825407ede0b70b2ab9",
        "title": "Title2",
        "description": "This is description which change according to title2",
        "tag": "personal",
        "__v": 0
      }
    ]
  const [notes, setNotes] = useState(notesInitial);

  //ADD A NOTE
  const addNote = (title, description, tag) => {
    console.log("Adding a log");
    //TO DO API CALL
    const note = {
      "_id": "67619f3a094f1957d9eabcef23",
      "user": "675d42825407ede0b70b2ab9",
      "title": "title added",
      "description": "description added",
      "tag": "tag added",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //EDIT A NOTE
  const editNote = () => {

  }

  //DELETE A NOTE
  const deleteNote = () => {

  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;