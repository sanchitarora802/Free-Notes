import { useState } from "react"
import noteContext from "./noteContext"


const NoteState = (props) => {

    //create a new state  {Hard coded value because for api tests}
    const notesStarting = [
        {
            "_id": "62d122baefcebb86815a8382",
            "userid": "62cd48eb110b4af5a0563329",
            "title": "Second Note",
            "description": "This is the Second note from this api call",
            "tag": "General",
            "timeStamp": "2022-07-15T08:18:02.625Z",
            "__v": 0
        },
        {
            "_id": "62d1230eefcebb86815a8385",
            "userid": "62cd48eb110b4af5a0563329",
            "title": "Starting Notes",
            "description": "This is the Starting of the notes",
            "tag": "General",
            "timeStamp": "2022-07-15T08:19:26.592Z",
            "__v": 0
        },
        {
            "_id": "62d1239befcebb86815a8387",
            "userid": "62cd48eb110b4af5a0563329",
            "title": "Free-Notes Value",
            "description": "This note is created for testing.",
            "tag": "General",
            "timeStamp": "2022-07-15T08:21:47.570Z",
            "__v": 0
        }
    ]

    // Add a new note 
    const addNote = (title, description, tag) => {

        const dummyNote =
        {
            "_id": "62d1239befcebb8681125a8387",
            "userid": "62cd48eb110b4af5a0563329",
            "title": title,
            "description": description,
            "tag": tag,
            "timeStamp": "2022-07-15T08:21:47.570Z",
            "__v": 0
        }
        console.log("Adding a new note")
        setNotes(notes.concat(dummyNote))
    }

    // Delete a new note 
    const deleteNote = (id) => {
        console.log("deleting a existing note")
        setNotes(notes.filter( (note) => {
            return note._id !== id
        }))        
    }

    // Edit a new note



    //Notes State
    const [notes, setNotes] = useState(notesStarting)

    return (
        //Boiler plate code for using context api (Wherever the NoteState would be used within that the props.children will be automatically inserted )
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState