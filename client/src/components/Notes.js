import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';

import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


//use Ref is used to to rdefer one element

const Note = (props) => {
  const navigate = useNavigate();

  const context = useContext(noteContext);

  const { notes, getNotes, editNote } = context;




  useEffect(() => {

    if(localStorage.getItem('token')){
      getNotes();
    }
   else{
    navigate('/login');
   }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
   
  }


  

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("updated succesfully","success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className="row my-3">

  


      <button ref={ref} type="button" className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle <5 || note.edescription<5} onClick={handleClick} className="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>

<div className="container row ">
    
      <div className="container mx-2">
      {notes.length===0 && "No notes here"}
      </div>
      {
        notes.map((note) => {
          
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
        })
      }
     
    </div>
    </div>
  )
}

export default Note
