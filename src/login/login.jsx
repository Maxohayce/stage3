import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/gallery")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setErrorMessage(errorMessage);
            });
    }

    return (
        <div className="loginForm">
            <form className="login" action="" onSubmit={loginHandler}>
                <div className="user-image">
                    <div className="head"></div>
                    <div className="body"></div>
                </div>
                <h3>Welcome!</h3>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type={"text"}
                    id="username"
                    name="username"
                    placeholder="username or email" />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={"text"}
                    id="password"
                    name="password"
                    placeholder="password" />
                <button type="submit">Login</button>
                <p className="errorMessage">{errorMessage}</p>
                <p>New User? <Link to={"/signup"}> Sign up</Link></p>
            </form>
        </div>
    )
}

export default Login;
