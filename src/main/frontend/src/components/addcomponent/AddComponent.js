import React from 'react'

function AddComponent({text, handleClick}) {
  
  return (
    
    <div onClick={()=>handleClick()} >
        <button data-name="add" className="p-2 rounded-md bg-slate-300">{text}</button>
    </div>
  )
}

export default AddComponent