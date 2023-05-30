import { useState } from "react";
import "../styles/signin.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Registration() {
  let [password, setPassword] = useState();
  let [mail, setMail] = useState();
  let [username, setUsername] = useState();
  let navigate = useNavigate();
  const SingUp = async (event) => {
    event.preventDefault();
    if (username) {
      try {
        await createUserWithEmailAndPassword(auth, mail, password);
        const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`);
        setDoc(
          usersRef,
          { username: username, todoItems: [],notesItems: []},
          { merge: true }
        );
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    } else {
    }
  };
  const SingIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, mail, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="signin-component">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true"></input>
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="text"
              placeholder="User name"
              required=""
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) => {
                setMail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button className="SignIn-Button" onClick={SingUp}>
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form>
            <label
              htmlFor="chk"
              aria-hidden="true"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) => {
                setMail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button className="SignIn-Button" onClick={SingIn}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
