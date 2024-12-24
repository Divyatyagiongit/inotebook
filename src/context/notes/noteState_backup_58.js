import { useState,setState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    
    const s1 = {
        "name":"henry",
        "class":"5b",
    }

    const [state,setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"henry10",
                "class":"10b",
            })
        }, 1000);
    }

    return(
        <noteContext.Provider value ={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;