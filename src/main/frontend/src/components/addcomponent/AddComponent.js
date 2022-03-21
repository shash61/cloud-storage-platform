import React from 'react'

function AddComponent({text, handleClick}) {
  return (
    
    <div>
        <button className="p-2 rounded-md bg-slate-300">{text}</button>
    </div>
  )
}

export default AddComponent