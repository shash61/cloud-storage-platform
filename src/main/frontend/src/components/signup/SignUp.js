import { Button } from '@mui/material'
import React from 'react'

function SignUp() {
  function handleSubmit(e){
    e.preventDefault()
    console.log('submit')
  }

  function handleClear(){

  }
  
  return (
    <div className="p-4 text-gray-100 rounded-md w-[500px] bg-slate-700">
       <form className="grid space-y-4" onSubmit={handleSubmit}>
         <input className="p-2 bg-transparent border-b focus:outline-none" type="text" placeholder="Enter Name" autoFocus="true"/>
         <input className="p-2 bg-transparent border-b focus:outline-none" type="text" placeholder="Enter Email"/>
         <input className="p-2 bg-transparent border-b focus:outline-none" type="text" placeholder="Enter Password"/>
           
         <div className="flex mt-2 space-x-4 place-content-end">
         <button className='btncontainer' type="submit">Register</button>
         <button className='btncontainer' onClick={handleClear} type="button">Clear</button>
         </div>
       </form>
        
        </div>
  )
}

export default SignUp