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
    
     const [notes,setNotes] = useState(notesStarting)
   

   return(
    //Boiler plate code for using context api (Wherever the NoteState would be used within that the props.children will be automatically inserted )
    <noteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </noteContext.Provider>
   )
}

export default NoteState