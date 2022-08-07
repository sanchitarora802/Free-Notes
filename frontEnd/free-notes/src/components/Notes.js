import React from 'react'
import { useContext, useEffect,useRef,useState } from 'react'
import noteContext from '../contexts/notes/noteContext'
import NoteItem from './NoteItem'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Notes(props) {

    let navigate = useNavigate();
    const [demoNote, setdemoNote] = new useState({
        id:"",
        title: "",
        description: "",
        tag: ""
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const context = useContext(noteContext)
    const ref = useRef(null)

    function openModal(note)
    {
        ref.current.click()
        // console.log(note)
        setdemoNote(note)
        // console.log(demoNote)
    }

    const changeFunction = (e) => {
        setdemoNote({...demoNote, [e.target.name] : [e.target.value]})
    }

    const handleSubmit = (e) => {
       e.preventDefault();
    //    console.log("edit submit button")
       // while calling the function always check the parameters to send. Dont always send the complete object. Check for the parameters it is accepting
    //    console.log("while passing in submit function",{demoNote})
       context.editNote(demoNote._id,demoNote.title.toString(),demoNote.description.toString(),demoNote.tag.toString())
       handleClose();
    }

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            context.getNotes()
        }
        else
        {
            navigate("../", { replace: true });
            props.showAlert("Please Login to use Free-Notes","danger")
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>

    {/* Modal Button */}
    <div>
        <Button className='d-none' ref={ref} variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
        {/* Modal code with react bootstrap liberary  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    <input type="text" className="form-control" id="tag" name= "tag" placeholder="Enter tag " value={demoNote.tag} onChange={changeFunction} />
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      </div>


            <div className={`container text-${props.textheadingcolor}`}>
                <h2>Available Notes</h2>
            </div>
            <div className="container">
                <div className='row my-3'>
                    <div className={`container mx-2 text-${props.textheadingcolor} `}>
                    {context.notes.length === 0 ? "No Notes To Display":""}
                    </div>
                    {/* NoteItem is seprate component in which is used by sending props using map function and create new NoteItems. */}
                    {context.notes.map((note) => {
                        return <NoteItem  mode = {props.mode} textheadingcolor={props.textheadingcolor}  key={note._id} note={note} openModal={openModal}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes