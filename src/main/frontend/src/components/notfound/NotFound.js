import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import notFound from '../../assets/404.jpg'
function NotFound() {
    const navigate=useNavigate()
    function handleClick(){
        navigate('/')
    }
  return (
    <div className='h-100 bg-white grid place-content-center'>
        <img className="h-96 mx-auto" src={notFound} alt='404'/>

        <button onClick={handleClick} className="p-2 btncontainer hover:bg-slate-900 text-white hover:text-white">
          HomePage
        </button>
    </div>
  )
}

export default NotFound