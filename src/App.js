import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import {Routes, Route, Navigate} from "react-router-dom"
import { selectLoggedInUser, setUser } from "./redux/reducers/usersReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import Main from './components/Main';
import SignIn from './components/SignIn';
import Todo from './components/Todo';
import Notes from './components/Notes';

function App() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      dispatch(setUser(u?.email));
    });
  },[]);

  return (
    <div className="App">
      <Routes>
        {loggedInUser?
        (<>
        <Route path='/' element={<Main />} />
        <Route path='todo' element={<Todo />} />
        <Route path='notes' element={<Notes />} />
        </>)
        :
        (<>
        <Route index path='/' element={<Home />} />
        <Route path='registration' element={<SignIn />} />
        </>)
        }
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
    </div>
  );
}

export default App;
