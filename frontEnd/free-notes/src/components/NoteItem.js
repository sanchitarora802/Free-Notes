import React from 'react'

function NoteItem(props) {
    return (
        <div className='col-md-3 mx-3'>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.note.title}</h5>
                        <p className="card-text">{props.note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem