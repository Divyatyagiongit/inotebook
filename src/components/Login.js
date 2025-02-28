import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [cred, setCred] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:cred.email, password:cred.password})
          });
          const json = await response.json();
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully","success")
          }else{
            //alert("Invalid Credential");
            props.showAlert("Invalid Credential","danger")
          }
          console.log(json)
    }
    const onChange = (e)=>{
        setCred({...cred, [e.target.name] : e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlfor="email" className="form-label">Email address*</label>
                    <input type="email" className="form-control" id="email" value={cred.email} onChange={onChange} name="email" aria-describedby="emailHelp" requried/>
                </div>
                <div className="mb-3">
                    <label htmlfor="password" className="form-label">Password*</label>
                    <input type="password" className="form-control" id="password" value={cred.password} onChange={onChange} name="password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login