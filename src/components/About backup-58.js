import React, {useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'


function About() {
  var a = useContext(noteContext);
   
  useEffect(() => {
    a.update();
  }, [])
  
  return (
    <div>This is About {a.name} , {a.state.name}</div>
  )
}

export default About