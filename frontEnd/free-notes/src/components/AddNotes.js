import React, {useContext,useState} from 'react'
import Notes from './Notes'
import contextPath from '../contexts/notes/noteContext'

function AddNotes(props) {

    const contextUsed = useContext(contextPath)
    
    // Default state for this component only 
    const [demoNote, setdemoNote] = new useState({
        title: "",
        description: "",
        tag: ""
    })


    // this function will directly call the set state function and will change the event value of event name automatically. But then the default state name and input names should match.
        const changeFunction = (e) => {
        setdemoNote({...demoNote, [e.target.name] : [e.target.value]})
    }

    const handleSubmit = (e) => {
       e.preventDefault();
    //    console.log("Add button")
       // while calling the function always check the parameters to send. Dont always send the complete object. Check for the parameters it is accepting
       contextUsed.addNote(demoNote.title.toString(),demoNote.description.toString(),demoNote.tag.toString())
       setdemoNote({ title: "",
       description: "",
       tag: ""})
    }



    return (
        <>
            <div className='container my-3'>
                <h2>Add Your Notes Here</h2>
            </div>

            <form className="container my-3">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" id="title" name= "title" placeholder="Enter title" value={demoNote.title} onChange={changeFunction}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" id="description" name= "description" placeholder="Enter Description" value={demoNote.description} onChange={changeFunction} />
                </div>
               
                <div className="form-group">
                    <label>Tag</label>
                    <input type="text" className="form-control" id="tag" name= "tag" placeholder="Enter tag" value={demoNote.tag} onChange={changeFunction} />
                </div>

                <button type="submit"  className="btn btn-primary my-3" onClick={handleSubmit}>Add Note</button>
            </form>
             
            {/* Used to call another notes component  */}
            <Notes showAlert={props.showAlert} />   
        </>
    )
}

export default AddNotes