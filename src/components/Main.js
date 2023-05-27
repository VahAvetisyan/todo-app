import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import "../styles/main.css"
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate()

const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error.message);
    });
}

const onTodoClick = () =>{
    navigate('todo')
}

const onNotesClick = () =>{
    navigate('notes')
}

  return (
    <div id='main-component'>
        <div id='items'>
            <div id='todo' onClick={onTodoClick}><p><b>VA-TODO LIST</b></p><FormatListBulletedIcon sx={{fontSize: '100px'}}/></div>
            <div id='notes' onClick={onNotesClick}><p><b>VA-NOTES</b></p><TextSnippetIcon sx={{fontSize: '100px'}}/></div>
        </div>
        <div id='signOut'>
        <button onClick={onLogOutClick}><LogoutIcon /></button>
        </div>
    </div>

  )
}
