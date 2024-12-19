import "./signUp.scss";
import user from "./eye/user.png"
import mail from "./eye/email.png"
import lock from "./eye/padlock.png"
import eyesopen from '../signUp/eye/eye.png'
import eyesClose from '../signUp/eye/close-eye.png'
import { Link, useNavigate } from "react-router-dom"
import { db } from './firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"
const signIn = () => {
  //  ------------------------------------------------------------------
  function togal1() {
    const open = document.querySelector('.openEyes');
    const close = document.querySelector('.closeEyes');
    const passwordInput = document.querySelector('.pass');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      open.style.visibility = 'hidden';
      close.style.visibility = 'visible';
    } else {
      passwordInput.type = 'password';
      open.style.visibility = 'visible';
      close.style.visibility = 'hidden';
    }
  }
  function togal2() {
    const open = document.querySelector('.copenEyes');
    const close = document.querySelector('.ccloseEyes');
    const passwordInput = document.querySelector('.cpass');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      open.style.visibility = 'hidden';
      close.style.visibility = 'visible';
    } else {
      passwordInput.type = 'password';
      open.style.visibility = 'visible';
      close.style.visibility = 'hidden';
    }
  }
  // ---------------------------------------------------- backend--------------------------------------
  const histoy = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(db, email, password)
    histoy("/home")
  }
  // ---------------------------------------------------------------------------------------------------


  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <center><div className="parent1">
          <div className='container1'>
            <center><h1>Sign Up</h1></center>
            <img src={user} className="userImg" />
            <span className="username">&nbsp; User Name</span>
            <input name="user" type="text" className='uName' placeholder='Enter your Name' />
            <img className="mail" src={mail} />
            <span className='emailname'>&nbsp; Email</span>
            <input name="email" type="email" placeholder='Enter Email' className='email' />
            <img src={lock} className="lock1" />
            <img src={eyesopen} className='openEyes' onClick={togal1} />
            <img src={eyesClose} className='closeEyes' onClick={togal1} />
            <span className="lockname1">&nbsp; Password</span>
            <input name="password" type="password" placeholder='Enter the password' className='pass' />
            <img src={lock} className="lock2" />
            <img src={eyesopen} className='copenEyes' onClick={togal2} />
            <img src={eyesClose} className='ccloseEyes' onClick={togal2} />
            <span className="lockname2">&nbsp; Confirm Password</span>
            <input type="password" placeholder='Enter the password' className='cpass' />
            <center><button className='btn'>Sign Up</button></center>
            <center><h5 className="h5">For existing account : <Link to="/">Sing In</Link></h5></center>
          </div>
        </div></center></form>
    </div>
  )
}

export default signIn