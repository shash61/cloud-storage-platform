import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteCredential, updateCredential } from '../../services/Credential';
import { getCredentials } from '../../redux/actions/credentialsActions';

function PopUpOperations({id, active, setActive, toggle, setToggle, websiteUrl, createdAt, updatedAt, password,user, dispatch}) {
  const[updatedModalVisibility, setUpdatedModalVisibility]=React.useState(false)
  const [updatedWebsiteUrl, setUpdatedWebsiteUrl]=React.useState(websiteUrl)
  const [updatedPassword, setUpdatedPassword]=React.useState(password)
  
      
    React.useEffect(()=>{
        active!==id ? setToggle(false):setToggle(true)
    },[active])


    function handleClick(e){
        console.log(e.target.dataset.name)
        switch(e.target.dataset.name){
            case "operations":
            setActive(id)
            setToggle(!toggle)
            break;
            case "edit":
                console.log("edit",id)
                setUpdatedModalVisibility(true)
                break;
            case "cancel":
                setUpdatedModalVisibility(false)
                break;
            case "delete":
                const state={
                    id,
                    websiteUrl,
                    password,
                    createdAt,
                    updatedAt
                }
                console.log(state);
                (async()=>{
                    try{
                        
                        const res=await deleteCredential(id,state,user?.id)
                        console.log(res)
                        if(res.status===200){
                            dispatch(getCredentials(user?.id))
                        }
                    }catch(err){
                        console.log(err)
                    }
                })();
                console.log('delete',id)
                break;
            default: setToggle(false)
        }
        
    }
    
    function handleSubmit(e){
        e.preventDefault();
        const newState={
            id:id,
            websiteUrl:updatedWebsiteUrl,
            password:updatedPassword,
            createdAt:createdAt,
            updatedAt:new Date().toISOString()
        };
        (async()=>{
           try{
               const res=await updateCredential(id, newState,user?.id)
               console.log(res)
               if(res.status===200){
                   setUpdatedModalVisibility(false)
                   dispatch(getCredentials(user?.id))
                   setActive(null)
               }
           }catch(err){
               console.log(err)
           }
        })();
        console.log(newState)
        
    }
  return (
      
      <div onClick={handleClick}>
        <div data-name="operations" className='relative cursor-pointer max-w-max' >
        <MoreHorizIcon  className={` hover:bg-slate-700 focus:bg-slate-600 ${active===id && toggle && 'bg-slate-700'} pointer-events-none` }  fontSize="medium"/>
        </div>
        { toggle && active===id? 
            <div className='absolute z-50 text-center text-gray-100 rounded-sm bg-slate-700'>
         <p className="p-2 text-sm cursor-pointer hover:bg-slate-600" data-name="edit">Edit</p>
         <p className="p-2 mt-1 text-sm cursor-pointer hover:bg-slate-600 " data-name="delete">Delete</p>
        </div> :null
        }
        {updatedModalVisibility ? 
        <div className="h-[100vh] absolute inset-0 grid place-items-center">
            <form className='grid space-y-4 bg-slate-800 w-[300px] py-4 px-2' onSubmit={handleSubmit}>
                <input type="text" className='bg-transparent focus:outline-none' placeholder='websiteUrl'  onChange={(e)=>setUpdatedWebsiteUrl(e.target.value)} value={updatedWebsiteUrl} />
                <input type="text" className="bg-transparent focus:outline-none" placeholder='password' value={updatedPassword} onChange={(e)=>setUpdatedPassword(e.target.value)}/>

                <div className="flex space-x-4 place-content-end ">
                <button data-name="cancel" className='w-20 py-1 text-white rounded-md hover:bg-gray-300 hover:text-black' type="button">Cancel</button>
                <button type="submit"  className='w-20 py-1 text-white rounded-md hover:bg-gray-300 hover:text-black'>Submit</button>
                </div>
                
            </form>
            
        </div>:null}
        
        
    </div>
  )
}

export default PopUpOperations