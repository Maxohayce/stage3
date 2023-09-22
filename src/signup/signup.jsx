import { useState } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                setErrorMessage(errorMessage);
            });
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type={"text"}
                    id="email"
                    name="email"
                    placeholder="email" />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={"text"}
                    id="password"
                    name="password"
                    placeholder="password" />
                <button onClick={submitHandler} type="submit">Sign up</button>
                {errorMessage && ( // Conditionally render error message
                    <p className="errorMessage">{errorMessage}</p>
                )}
                <p>Existing User? <Link to={"/"}> Login </Link></p>
            </form>

        </div>
    )
}

export default SignUp;