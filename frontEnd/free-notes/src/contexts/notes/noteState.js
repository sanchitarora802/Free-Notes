import noteContext from "./noteContext"


const NoteState = (props) => {

    //create a new state
    const state = {
       name: "sanchit",
       class: "10c"
    }

   return(
    //Boiler plate code for using context api (Wherever the NoteState would be used within that the props.children will be automatically inserted )
    <noteContext.Provider value={state}>
        {props.children}
    </noteContext.Provider>
   )
}

export default NoteState