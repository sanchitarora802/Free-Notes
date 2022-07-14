import React, {useContext} from 'react'
import NoteContext from '../contexts/notes/noteContext'

function About() {

    const a = useContext(NoteContext)

  return (
    <>
       <h1>Hello from About page</h1>
       <h2>Using contextApi with {a.name} and the class is {a.class} </h2>
    </>
  )
}

export default About


