import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import "../styles/notes.css";
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

export default function Notes() {
  const navigate = useNavigate();
  const [newNoteContext, setNewNoteContext] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [noteName, setNoteName] = useState("");

  const notesRef = doc(db, "Users", `${auth.currentUser.uid}`);

  const onAddBtnClick = async (event) => {
    event.preventDefault(event);
    setNewNoteContext("");
    await updateDoc(notesRef, {
      notesItems: arrayUnion({note_context:newNoteContext, note_name: noteName}),
    });
  };

  const onDeleteBtnClick = async (el) => {
    await updateDoc(notesRef, {
      notesItems: arrayRemove(el),
    });
    newNoteContext ? setNewNoteContext("") : setNewNoteContext(" ");
  };

  const getNotesList = async () => {
    const docSnap = await getDoc(notesRef);
    setNotesList(docSnap.data().notesItems);
  };

  useEffect(() => {
    getNotesList();
  }, [newNoteContext]);

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

  if (!notesList) {
    return <LinearProgress />;
  }

  return (
    <div id="notes-component">
      <div id="notes-app">
        <div id="notes-header">
          <input
            type="text"
            name="note-name"
            value={noteName}
            placeholder="Note Name"
            onChange={(e) => {
              setNoteName(e.target.value);
            }}
          /><button onClick={onAddBtnClick}>
          <b>ADD</b>
        </button><br/>
          <textarea id="note-context" name="note-context" rows="10" cols="50" onChange={e=>{setNewNoteContext(e.target.value)}}/>
        </div>
        <div id="notes-list">
          {notesList?.map((el, i) => (
            <div className="notes-items" key={el.note_name}>
              <div className="notes-text">
                <div className="notes" onClick={()=>alert(el.note_context)}>
                  {el.note_name}
                </div>
              </div>
              <div className="notes-items-buttons">
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
