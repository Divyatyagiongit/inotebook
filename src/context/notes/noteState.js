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
    try {
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
    } catch (e) {
      console.error(e);
    }
  }

  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    console.log("Adding a note");
    //TO DO API CALL
    try {
      const response = await fetch(`${host}/api/Notes/addNotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ZDQyODI1NDA3ZWRlMGI3MGIyYWI5In0sImlhdCI6MTczNDQyMjE1M30.dJdCbTBQfw7parD8RpH7gSjZkeM39lvIYtnMri61xGY'
        },
        body: JSON.stringify({ title: title, description: description, tag: tag })
      });
      const resJson = await response.json;
      console.log("noteState.AddNote:" + resJson)
      /*const note =
      {
        "_id": "676f631f51c615c974d659d1",
        "user": "675d42825407ede0b70b2ab9",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2021-09-03T14:20:09.668Z",
        "__v": 0
      }*/
      const note = resJson
      
      setNotes(notes.concat(note))
      console.log(notes)
      console.log("notes added successfully"+notes)
    } catch (e) {
      console.error(e);
    }
  }

  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    //TODO API CALL
    console.log("noteState.editNote Called  ")
    try {
      const response = await fetch(`${host}/api/Notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ZDQyODI1NDA3ZWRlMGI3MGIyYWI5In0sImlhdCI6MTczNDQyMjE1M30.dJdCbTBQfw7parD8RpH7gSjZkeM39lvIYtnMri61xGY'
        },
        body: JSON.stringify({ title: title, description: description, tag: tag })
      });
      const resJson = response.json;
      console.log(resJson)
      //Logic to edit in client
      const newNotes = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
        }
      }
      setNotes(newNotes)
    } catch (e) {
      console.error(e);
    }
  }

  //DELETE A NOTE
  const deleteNote = async (id) => {
    //TO DO API CAll
    try {
      const response = await fetch(`${host}/api/Notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ZDQyODI1NDA3ZWRlMGI3MGIyYWI5In0sImlhdCI6MTczNDQyMjE1M30.dJdCbTBQfw7parD8RpH7gSjZkeM39lvIYtnMri61xGY'
        }
      });
      const resJson = response.json;
      console.log(resJson)

      //logic to delete note
      console.log("delete node called:" + id);
      const newNode = notes.filter((note) => { return note._id !== id })
      setNotes(newNode)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;