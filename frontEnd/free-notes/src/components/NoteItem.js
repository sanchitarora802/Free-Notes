import React, { useContext } from "react";
import contextPath from "../contexts/notes/noteContext";
import "../App.css";

function NoteItem(props) {
  const contxtUsed = useContext(contextPath);

  function handleEdit(e) {
    e.preventDefault();
    // console.log("edit button")
    props.openModal(props.note);
  }

  function handleDelete(e) {
    e.preventDefault();
    // console.log("delete button")
    contxtUsed.deleteNote(props.note._id);
  }

  return (
    <div className="col-md-3 mx-3 my-3">
      <div className="card">
        <div className={`card-body bg-${props.mode}`}>
          <div className="d-flex">
            <h5 className={`card-title text-${props.textheadingcolor}`}>
              {props.note.title}
            </h5>
          </div>
          <p className={`card-text text-${props.textheadingcolor}`}>
            {props.note.description}
          </p>
          <i
            className="fs-3 bi bi-pencil-square mx-3 text-white"
            title="Edit Note"
            onClick={handleEdit}
          ></i>
          <i
            className="fs-3 bi bi-trash mx-3 text-white"
            title="Delete Note"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
