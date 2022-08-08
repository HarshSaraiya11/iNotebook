import { React, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card text-bg-light mb-3 my-3 shadow rounded">
        <div className="card-header ">
          <div className="d-flex justify-content-between    ">
            {note.title}
            <div>
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
