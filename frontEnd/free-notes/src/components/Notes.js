import React from 'react'
import { useContext,useEffect } from 'react'
import noteContext from '../contexts/notes/noteContext'
import NoteItem from './NoteItem'

function Notes() {
    const context = useContext(noteContext)
    useEffect(()=>{
        context.getNotes()
    },[])
    return (
        <>
           <div className='container'>
           <h2>Available Notes</h2>
           </div>
           <div className="container">
            <div className='row my-3'>
                 {/* NoteItem is seprate component in which is used by sending props using map function and create new NoteItems. */}
                {context.notes.map((note) => {
                    return <NoteItem key = {note._id} note={note} />
                })}
            </div>
            </div>
        </>
    )
}

export default Notes