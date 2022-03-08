import React from 'react'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate=useNavigate()

    function handleClick(e){
        
           navigate(e.target.dataset.name)
    }
  return (
    <div className="flex items-center justify-between p-4 text-gray-100 bg-slate-700" >
        <h3 className="text-lg font-semibold">Cloud Storage</h3>
                
        <div className="flex items-center space-x-4" onClick={handleClick}>
            <div className='btncontainer' data-name="signup" >
            <HowToRegIcon className='pointer-events-none '/>
            <button className='pointer-events-none'>Register</button>
            </div>
            <div className="btncontainer" data-name="login">
             <LoginIcon className="pointer-events-none "/>   
            <button className='pointer-events-none'>Login</button>
            </div>
                
        </div>
    </div>
  )
}

export default Navbar