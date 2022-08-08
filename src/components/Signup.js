import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully.","success")
    }else{
      props.showAlert("Invalid details","danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-signin w-100 m-auto text-center">
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Notas.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            // value={credentials.email}
            onChange={onChange}
            placeholder="Name"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            // value={credentials.email}
            onChange={onChange}
            placeholder="name@example.com"
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            // value={credentials.password}
            onChange={onChange}
            placeholder="Password"
            minLength={5}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="cpasword"
            name="cpasword"
            // value={credentials.password}
            onChange={onChange}
            placeholder="cpasword"
            minLength={5}
            required
          />
          <label htmlFor="cpasword">Confirm Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary my-4" type="submit">
          Sign Up
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </div>
  );
};

export default Signup;
