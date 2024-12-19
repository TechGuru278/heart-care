import "./signIn.scss";
import lock from "../signUp/eye/padlock.png";
import user from "../signUp/eye/user.png";
import eyesopen from "../signUp/eye/eye.png";
import eyesClose from "../signUp/eye/close-eye.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const toggleVisibility = () => {
    const open = document.querySelector(".openEyes");
    const close = document.querySelector(".closeEyes");
    const passwordInput = document.querySelector(".pass");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      open.style.visibility = "hidden";
      close.style.visibility = "visible";
    } else {
      passwordInput.type = "password";
      open.style.visibility = "visible";
      close.style.visibility = "hidden";
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/doctor"); // Redirect to home page
    } catch (error) {
      alert("Sign-in failed. Please check your email or password."); // Handle errors
    }
  };

  return (
    <div>
      <center>
        <div className="parent">
          <div className="container">
            <center>
              <h1>Sign In For Doctor</h1>
            </center>
            <img src={user} className="userImg" alt="User Icon" />
            <span className="users">Email</span>
            <input
              type="email"
              className="uName"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <img src={lock} className="lock" alt="Lock Icon" />
            <img
              src={eyesopen}
              className="openEyes"
              onClick={toggleVisibility}
              alt="Show Password"
            />
            <img
              src={eyesClose}
              className="closeEyes"
              onClick={toggleVisibility}
              alt="Hide Password"
            />
            <span className="lockname">&nbsp; &nbsp; &nbsp; &nbsp;Password</span>
            <input
              type="password"
              placeholder="Enter the password"
              className="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <center>
              <button className="loginbtn" onClick={handleSignIn}>
                Sign In
              </button>
            </center>
            <center>
              <h5>
                For new account : <Link to="/signUp">Sign up</Link>
              </h5>
            </center>
          </div>
        </div>
      </center>
    </div>
  );
};

export default SignIn;
