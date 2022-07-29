import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {

    const host = "http://localhost:4000/api/fetchNotes"

    //create a new state  {Hard coded value because for api tests}
    const notesStarting = []

    //Notes State
    const [notes, setNotes] = useState(notesStarting)

    //Fetch all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/getNotes`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJzYW5jaGl0IGFyb3JhIiwiZW1haWwiOiJzYW5jaGl0YXJvcmFAZ21haWwuY29tIiwiaWQiOiI2MmNkNDhlYjExMGI0YWY1YTA1NjMzMjkifSwiaWF0IjoxNjU3Njk4NDUyfQ.kC-dd1ChQ4Ys5huORQe1pmQoxrMo6AQb_ER69sGtN9o"
            }
        })
        const fetchedData = await response.json()
        // console.log(fetchedData)
        setNotes(fetchedData)
    }

    // Add a new note 
    const addNote = async (title, description, tag) => {
        // eslint-disable-next-line
        tag === "" ? tag = "General" : tag = tag
        await fetch(`${host}/createNote`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJzYW5jaGl0IGFyb3JhIiwiZW1haWwiOiJzYW5jaGl0YXJvcmFAZ21haWwuY29tIiwiaWQiOiI2MmNkNDhlYjExMGI0YWY1YTA1NjMzMjkifSwiaWF0IjoxNjU3Njk4NDUyfQ.kC-dd1ChQ4Ys5huORQe1pmQoxrMo6AQb_ER69sGtN9o"
            },
            body: JSON.stringify({ title, description, tag })
        })
    //     const dummyNote =
    //     {
    //         "_id": "62d1239befcebb8681125a8387",
    //         "userid": "62cd48eb110b4af5a0563329",
    //         "title": title,
    //         "description": description,
    //         "tag": tag,
    //         "timeStamp": "2022-07-15T08:21:47.570Z",
    //         "__v": 0
    //     }
    //     console.log("Adding a new note")
    //     setNotes(notes.concat(dummyNote))
            getNotes()
    }

    // Delete a new note 
    const deleteNote = async (id) => {
        await fetch(`${host}/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJzYW5jaGl0IGFyb3JhIiwiZW1haWwiOiJzYW5jaGl0YXJvcmFAZ21haWwuY29tIiwiaWQiOiI2MmNkNDhlYjExMGI0YWY1YTA1NjMzMjkifSwiaWF0IjoxNjU3Njk4NDUyfQ.kC-dd1ChQ4Ys5huORQe1pmQoxrMo6AQb_ER69sGtN9o"
            }
        })
        console.log("deleting a existing note")
        // setNotes(notes.filter((note) => {
        //     return note._id !== id
        // }))
        getNotes()
    }

    // Edit an existing note   
    const editNote = async (id, etitle, edescription, etag) => {
        try {
            await fetch(`${host}/updateNote/${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJzYW5jaGl0IGFyb3JhIiwiZW1haWwiOiJzYW5jaGl0YXJvcmFAZ21haWwuY29tIiwiaWQiOiI2MmNkNDhlYjExMGI0YWY1YTA1NjMzMjkifSwiaWF0IjoxNjU3Njk4NDUyfQ.kC-dd1ChQ4Ys5huORQe1pmQoxrMo6AQb_ER69sGtN9o"
                },
                body: JSON.stringify({ etitle, edescription, etag })
            })
        }
        catch {
            console.log("error found")
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
            getNotes()
            console.log("update successful")
    }

    return (
        //Boiler plate code for using context api (Wherever the NoteState would be used within that the props.children will be automatically inserted )
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
