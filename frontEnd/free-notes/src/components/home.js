import React from 'react'
import '../App.css'
import login from '../images/login.jpg'
import edit from '../images/edit.png'
import done from '../images/done.jpg'

function home(props) {
  return (
    <>
     <div className={`container text-${props.textheadingcolor}`}>
        <h1><center>Welecome to Free-Notes</center></h1>
     </div>

     <div className='row my-5'>
        <div className='col-md-3 photodiv offset-md-1'>
        <img src={login} className="photocss" alt="not avilable" style={{width:"100%",height:"100%",border:"solid 2px black"}} />
        </div>

        <div className='col-md-3 offset-md-1 photodiv'>
        <img src={edit} alt="not avilable" style={{width:"80%",height:"100%",border:"solid 2px black"}}  />
        </div>

        <div className='col-md-3 offset-md-1 photodiv'>
        <img src={done} alt="not avilable" style={{width:"80%",height:"100%",border:"solid 2px black"}}  />
        </div>
     </div>

     <div className='row'>
        <div className={`text-${props.textheadingcolor} col-md-3 offset-md-1`}>
        <h2 className='mx-5'>Signup/Login</h2>
        </div>

        <div className={`text-${props.textheadingcolor} col-md-3 offset-md-1`}>
        <h2>Add/Modify Notes</h2>
        </div>

        <div className={`text-${props.textheadingcolor} col-md-3 offset-md-1 my-3`}>
        <h2>Mark as Completed</h2>
        </div>
     </div>
       
    </>
  )
}

export default home