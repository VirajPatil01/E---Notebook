import React, { useContext } from 'react'

import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {


    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <div className='col-md-3' >
            <div className="card" id='card'>
                <div className="card-body">

                    <div className="icons d-flex justify-content-end">
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-trash-can mx-2 " onClick={() => { showAlert("Deleted succesfully", "success"); deleteNote(note._id) }}></i>

                    </div>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
