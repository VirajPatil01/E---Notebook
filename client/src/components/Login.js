import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const host="http://localhost:5000";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
  
    const navigate = useNavigate();
    

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify({ email: credentials.email,password:credentials.password})
        });

        const json=await response.json();
        console.log(json);

        if(json.success){

            localStorage.setItem('token',json.authtoken)
            navigate('/');
            props.showAlert("Logged in Succesfully","success")
        }else{
            props.showAlert("invalid credential","danger");
        }
    }

   
    return (
        <div className="final ">
            <div className="sign-in ">
                <div className="actual-container">
                    <div className="log-heading">
                        <h4>Login to eNotebook</h4>
                    </div>
                    <form className="forms" onSubmit={handleSubmit}>
                        <div className="form-group  my-4">
                            <input type="email" className="form-control" name="email" id="email" onChange={onChange} value={credentials.email} aria-describedby="email"
                                placeholder="Email" />
                        </div>
                        <div className="form-group my-4">
                            <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} placeholder="Password" />
                        </div>
                        {/* <div className="forgot-pass">
                            <Link to="#" id="fp"> Forgot password? </Link>
                        </div> */}
                        
                        <button type="submit" id="LoginBtn"  className=" py-2 px-2"> Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
