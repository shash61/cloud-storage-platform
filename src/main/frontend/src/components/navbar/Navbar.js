import React from 'react'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.userReducer || {})
    function handleClick(e){
        
           switch(e.target.dataset.name){
             case "signup":
               navigate('/signup')
               break;
             case "login":
               navigate('/login')
               break;
              case "logout":
                return;
              default:return;
           }
    }
  return (
    <div className="flex items-center justify-between p-4 text-gray-100 bg-slate-700" >
        <h3 className="text-lg font-semibold">Cloud Storage</h3>
                
        <div className="flex items-center space-x-4" onClick={handleClick}>
          {
            Object.values(user).length===0 ? 
            null
              :
              <div className="btncontainer">  
              <button className="pointer-events-none">Logout</button>  
              </div> 
              }
        </div>
    </div>
  )
}

export default Navbar