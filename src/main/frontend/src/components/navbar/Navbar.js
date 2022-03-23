import React from 'react'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logoutUser } from '../../redux/actions/userActions'
import cloud from '../../assets/cloud.png'
function Navbar() {
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.userReducer || {})
    const dispatch=useDispatch()
    function handleClick(e){
        
           switch(e.target.dataset.name){
              case "logout":
                dispatch(logoutUser());
                break;
              default:return;
           }
    }
  return (
    <div className="flex items-center justify-between p-4 text-gray-100 bg-slate-700" >

      <div className='flex items-center space-x-4'>
        <h3 className="text-xl font-semibold">Cloud Storage</h3>
        <img className="w-10 h-10 " src={cloud} alt=""/>
      </div>
                
        <div className="flex items-center space-x-4" onClick={handleClick}>
          {
            localStorage.getItem("token")===null ? 
            null
              :
              <div data-name="logout" className="btncontainer">  
              <button className="pointer-events-none">Logout</button>  
              </div> 
              }
        </div>
    </div>
  )
}

export default Navbar