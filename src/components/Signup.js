import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [cred, setCred] = useState({name:"", email:"", password:"", cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = cred;
        console.log(JSON.stringify({name:name, email:email, password:password}))
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:name, email:email, password:password})
          });
          const json = await response.json();
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
          }else{
            alert("Invalid Credential");
          }
          console.log(json)
    }
    const onChange = (e)=>{
        setCred({...cred, [e.target.name] : e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlfor="name" className="form-label">Name*</label>
                    <input type="text" className="form-control" id="name" value={cred.name} onChange={onChange} name="name" required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlfor="email" className="form-label">Email address*</label>
                    <input type="email" className="form-control" id="email" value={cred.email} onChange={onChange} name="email" required  aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlfor="password" className="form-label">Password*</label>
                    <input type="password" className="form-control" id="password" value={cred.password} onChange={onChange} name="password" required />
                </div>
                <div className="mb-3">
                    <label htmlfor="cpassword" className="form-label">Confirm Password*</label>
                    <input type="password" className="form-control" id="cpassword" value={cred.cpassword} onChange={onChange} name="cpassword" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup