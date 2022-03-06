import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import useForm from '../../hooks/useForm';

function SignUp() {
  const [type, setType]=React.useState("password")
  
  const [state, handleChange, handleSubmit, allClear]=useForm(handleRegister)
  console.log(handleSubmit)
  function handleRegister(){
    console.log(state,'submit') 
  }
  
  function handleType(){
    setType((prev)=>{
      return prev==="password" ? "text":"password" 
    })
  }  
  return (
    <div className="p-4 text-gray-100 rounded-md w-[500px] mx-auto bg-slate-700">
       <form className="grid space-y-4" onSubmit={handleSubmit}>
         <input className="p-2 bg-transparent border-b focus:outline-none" type="text" placeholder="Enter Name" autoFocus={true} value={state.name || ""} onChange={(e)=>handleChange(e)} required={true} minLength={4} name="name"/>
         <input className="p-2 bg-transparent border-b focus:outline-none" type="email" placeholder="Enter Email" value={state.email || ""} name="email" onChange={(e)=>handleChange(e)} required={true}/>
         <div className="flex items-center justify-between border-b">
         <input className= "w-full p-2 bg-transparent focus:outline-none" type={type} placeholder="Enter Password" value={state.password || ""} name="password" onChange={(e)=>handleChange(e)} required={true} minLength={8}/>
         {state.password!==undefined && state.password.length>0 && <VisibilityIcon onClick={handleType} className="mx-4 cursor-pointer" />}
         </div>
           
         <div className="flex mt-2 space-x-4 place-content-end">
         <button className='btncontainer' type="submit">Register</button>
         <button className='btncontainer' onClick={()=>allClear()} type="button">Clear</button>
         </div>
       </form>
        
        </div>
  )
}

export default SignUp