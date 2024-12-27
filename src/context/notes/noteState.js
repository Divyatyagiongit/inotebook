import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //GET ALL NOTES
  const getNotes = async () => {
    console.log("get all notes");
    //TO DO API CALL
    const response = await fetch(`${host}/api/Notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ZDQyODI1NDA3ZWRlMGI3MGIyYWI5In0sImlhdCI6MTczNDQyMjE1M30.dJdCbTBQfw7parD8RpH7gSjZkeM39lvIYtnMri61xGY',
      }
      
    });
      const resJson = await response.json();
      console.log(resJson);
      setNotes(resJson)
  }
  
  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    console.log("Adding a log");
    //TO DO API CALL
    const response = await fetch(`${host}/api/Notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ZDQyODI1NDA3ZWRlMGI3MGIyYWI5In0sImlhdCI6MTczNDQyMjE1M30.dJdCbTBQfw7parD8RpH7gSjZkeM39lvIYtnMri61xGY',
        'Access-Control-Allow-Origin': 'application/json',
      },
      body: JSON.stringify(title, description, tag)
    });
    const resJson = response.json;
    console.log(resJson)
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
  const editNote = async (id, title, description, tag) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/Notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ZDQyODI1NDA3ZWRlMGI3MGIyYWI5In0sImlhdCI6MTczNDQyMjE1M30.dJdCbTBQfw7parD8RpH7gSjZkeM39lvIYtnMri61xGY'
      },
      body: JSON.stringify(title, description, tag)
    });
    const resJson = response.json;
    console.log(resJson)
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }

  //DELETE A NOTE
  const deleteNote = (id) => {
    //TO DO API CAll
    console.log("delete node called:" + id);
    const newNode = notes.filter((note) => { return note._id !== id })
    setNotes(newNode)

  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;