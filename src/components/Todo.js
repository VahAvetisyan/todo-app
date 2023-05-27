import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import "../styles/todo.css";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { LinearProgress } from "@mui/material";

export default function Todo() {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState("");

  const todoRef = doc(db, "Users", `${auth.currentUser.uid}`);

  const onAddBtnClick = async (event) => {
    event.preventDefault(event);
    setNewTask("");
    await updateDoc(todoRef, {
      todoItems: arrayUnion(newTask),
    });
  };

  const onDeleteBtnClick = async (el) => {
    await updateDoc(todoRef, {
      todoItems: arrayRemove(el),
    });
    newTask ? setNewTask("") : setNewTask(" ");
  };

  const getTodoList = async () => {
    const docSnap = await getDoc(todoRef);
    setTodoList(docSnap.data().todoItems);
  };

  useEffect(() => {
    getTodoList();
  }, [newTask]);

  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onHomeClick = () => {
    navigate("/");
  };

  if (!todoList) {
    return <LinearProgress />;
  }

  return (
    <div id="todo-component">
      <div id="todo-app">
        <div id="todo-header">
          <input
            type="text"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
          <button onClick={onAddBtnClick}>
            <b>ADD</b>
          </button>
        </div>
        <div id="todo-list">
          {todoList?.map((el, i) => (
            <div className="todo-items" key={el}>
              <div className="todo-text">
                <p>
                  {i + 1}. {el}
                </p>
              </div>
              <div className="todo-items-buttons">
                <button className="edit-btn">
                  <b>EDIT</b>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    onDeleteBtnClick(el);
                  }}
                >
                  <b>DELETE</b>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="home-and-signOut">
        <button onClick={onHomeClick}>
          <HomeIcon />
        </button>
        <button onClick={onLogOutClick}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
}
