import { useState } from "react";
import noteContext from "./noteContext";
import jwt_decode from "jwt-decode";

const NoteState = (props) => {
  const host = `${process.env.REACT_APP_BE_DOMAIN}/api/fetchNotes`;

  //Notes State
  const [notes, setNotes] = useState([]);

  //Fetch all notes
  const getNotes = async () => {
    const decode = jwt_decode(localStorage.getItem("token"));
    // console.log(decode.user.id)
    const response = await fetch(`${host}/getNotes/${decode.user.id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const fetchedData = await response.json();
    // console.log(fetchedData)
    setNotes(Array.isArray(fetchedData) ? fetchedData : []);
    // console.log(notes,notesStarting)
  };

  // Add a new note
  const addNote = async (title, description, tag) => {
    // eslint-disable-next-line
    tag === "" ? (tag = "General") : (tag = tag);
    try {
      const response = await fetch(`${host}/createNote`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (response.status === 200) {
        getNotes();
        props.showAlert("Note Added Successfully", "success");
      }
      if (response.status === 400) {
        getNotes();
        props.showAlert("Title can not be empty", "warning");
      }
    } catch (e) {
      props.showAlert("Please try again", "danger");
    }
  };

  // Delete a new note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.Message !== "") {
        getNotes();
        props.showAlert("Note Deleted Successfully", "success");
      }
    } catch {
      props.showAlert("Please try again", "danger");
    }
    // console.log("deleting a existing note")
    // setNotes(notes.filter((note) => {
    //     return note._id !== id
    // }))
  };

  // Edit an existing note
  const editNote = async (id, etitle, edescription, etag) => {
    try {
      const response = await fetch(`${host}/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ etitle, edescription, etag }),
      });
      if (response._id !== "") {
        getNotes();
        props.showAlert("Note Updated Successfully", "success");
      }
    } catch {
      props.showAlert("Please try again", "danger");
    }

    // var newnotes = JSON.parse(JSON.stringify(notes))
    // console.log("editing a existing note")
    // console.log({ id, etitle, edescription, etag });
    // for (let index = 0; index < newnotes.length; index++) {
    //     const element = newnotes[index];

    //     if (element._id === id) {
    //         newnotes[index].title = etitle
    //         newnotes[index].description = edescription
    //         newnotes[index].tag = etag
    //         break;
    //     }
    // }
    // console.log(newnotes)
    // setNotes(newnotes)
    // console.log("update successful")
  };

  return (
    //Boiler plate code for using context api
    // (Wherever the NoteState would be used within that the
    // props.children will be automatically inserted )
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
