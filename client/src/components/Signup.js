import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword:""})
    const host="http://localhost:5000";

    const navigate = useNavigate();


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
       const {name,email,password}=credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name,email,password,})
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {

            localStorage.setItem('token', json.authtoken)
            navigate('/');    
            props.showAlert("Account created succesfully","success")
        }else{
            props.showAlert("invalid credential","danger");
        }
    }
    return (
        <div className="final ">
            <div className="sign-in ">

                <div className="actual-container">
                    <div className="log-heading my-4">
                        <h4>Create your account</h4>
                    </div>
                    <form className="forms" onSubmit={handleSubmit}>
                        <div className="form-group  my-4">
                            <input type="text" className="form-control" id="name" name="name"  onChange={onChange} aria-describedby="emailHelp"
                                placeholder="Full Name" />
                        </div>
                        <div className="form-group  my-4">
                            <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp"
                                placeholder="Email" />
                        </div>
                        <div className="form-group my-4">
                            <input type="password" className="form-control" id="password" name="password"  onChange={onChange} placeholder="Password" minLength={5} required/>
                        </div>
                        <div className="form-group my-4">
                            <input type="password" className="form-control" id="cpassword" name="cpassword"  onChange={onChange} placeholder=" Confirm password" minLength={5} required/>
                        </div>
                        <button type="submit" id="LoginBtn" className=" py-2 px-2"> Create Account</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup
