import React from 'react'
import Notes from './Notes'

function AddNotes() {
 

    return (
        <>
            <div className='container my-3'>
                <h2>Add Your Notes Here</h2>
            </div>

            <form className="container my-3">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
             
            {/* Used to call another notes component  */}
            <Notes/>   
        </>
    )
}

export default AddNotes