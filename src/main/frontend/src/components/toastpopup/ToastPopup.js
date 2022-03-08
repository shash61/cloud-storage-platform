import React from 'react'
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastPopup({text}) {
     const notify=(text)=>toast.dark(text, {autoClose:2000})
    React.useLayoutEffect(()=>{
    notify(text)
   },[]) 
     
  return (
        
       <ToastContainer >{text}</ToastContainer>
    
  )
}

export default ToastPopup