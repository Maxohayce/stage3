import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    const [message, setMessage] = useState("");
    const Navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => {
            let helper = { ...prev };
            helper[`${e.target.id}`] = e.target.value;
            return helper
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (formData.username.length < 4) {
            setMessage("username or email should be atleast 4 characters long");
            return;
        } else if (formData.password.length < 8) {
            setMessage("password should be atleast 8 characters long.")
            return;
        }

        setMessage("")
        Navigate("/gallery")
        console.log("form data", formData)
    }


    return (
        <div className="loginForm">
            <form className="login" action="" onSubmit={submitHandler} >
                <div className="user-image">
                    <div className="head"></div>
                    <div className="body"></div>
                </div>
                <h3>Welcome!</h3>
                <input
                    onChange={handleChange}
                    value={formData.username}
                    type={"text"}
                    id="username"
                    name="username"
                    placeholder="username or email" />
                <input
                    onChange={handleChange}
                    value={formData.password}
                    type={"text"}
                    id="password"
                    name="password"
                    placeholder="password" />
                <button onClick={submitHandler} type="submit">Login</button>
                <p className="errorMessage">{message}</p>
                <p>New User? <Link to={"/signup"}> Sign up</Link></p>
            </form>

        </div>
    )
}

export default Login;