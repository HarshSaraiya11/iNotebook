import {React} from 'react'
import "./Login.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In successfully.","success")
            navigate('/');
          }
          else{
            props.showAlert("Invalid credentials","danger")
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }

  return (
    <div className="form-signin w-100 m-auto text-center">
  <form onSubmit={handleSubmit}>
    <img className="mb-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Notas.png" alt="" width="72" height="72"/>
    <h1 className="h3 mb-3 fw-normal">Please Login</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="name@example.com"/>
      <label htmlFor="email">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password"/>
      <label htmlFor="password">Password</label>
    </div>
    <button className="w-100 btn btn-lg btn-primary my-4" type="submit" >Log in</button>
    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
  </form>
</div>
  )
}

export default Login