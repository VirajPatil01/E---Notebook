import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added succesfully","success")
    }
   

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <h3 id='headings'>Add Note</h3>


            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control border border-info" id="title" name="title" value={note.title}  onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                   
                    <input type="text" className="form-control border border-info" id="description" name="description"  value={note.description}  onChange={onChange} minLength={5} required/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control border border-info" id="tag" name="tag"  value={note.tag}  onChange={onChange} />
                </div>
                
                <button disabled={note.title<5 || note.description<5}  type="submit" className="btn btn-primary my-2" onClick={handleClick}>add note</button>
            </form>


        </div>
    )
}

export default AddNote
