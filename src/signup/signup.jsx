import { useState } from "react";
import "../login/login.css";
import { Link } from "react-router-dom";


const SignUp = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
        cpassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => {
            let helper = { ...prev };
            helper[`${e.target.id}`] = e.target.value;
            return helper
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (formData.cpassword !== formData.password) {
            setMessage("passwords do not match.");
            return;
        } else if (formData.fullname.trim().length === 0 ||
            formData.email.trim().length === 0 ||
            formData.username.trim().length === 0 ||
            formData.password.trim().length === 0 ||
            formData.cpassword.trim().length === 0) {
            setMessage("all fields are required.")
            return
        } else if (formData.fullname.length < 3) {
            setMessage("full name shoyld be atleast 3 characters long.");
            return;
        }
        if (formData.username.length < 4) {
            setMessage("username or email should be atleast 4 characters long");
            return;
        } else if (formData.password.length < 8) {
            setMessage("password should be atleast 8 characters long.")
            return;
        }
        setMessage("");
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
                    value={formData.password}
                    type={"text"}
                    id="fullname"
                    name="fullname"
                    placeholder="fullname" />
                <input
                    onChange={handleChange}
                    value={formData.password}
                    type={"text"}
                    id="email"
                    name="email"
                    placeholder="email" />
                <input
                    onChange={handleChange}
                    value={formData.username}
                    type={"text"}
                    id="username"
                    name="username"
                    placeholder="username" />
                <input
                    onChange={handleChange}
                    value={formData.password}
                    type={"text"}
                    id="password"
                    name="password"
                    placeholder="password" />
                <input
                    onChange={handleChange}
                    value={formData.password}
                    type={"text"}
                    id="cpassword"
                    name="cpassword"
                    placeholder="confirm-password" />

                <button type="submit">Sign up</button>
                <p className="errorMessage">{message}</p>
                <p>Existing User? <Link to={"/"}> Login </Link></p>
            </form>

        </div>
    )
}

export default SignUp;