import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteCredential, updateCredential } from '../../services/Credential';
import { getCredentials } from '../../redux/actions/credentialsActions';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteFile } from '../../services/Files';
import { toast } from 'react-toastify';
import { getFiles } from '../../redux/actions/fileactions';
import { useDispatch } from 'react-redux';
import AddModal, { FormContext } from '../addmodal/AddModal'

function PopUpOperations({id, active, setActive, toggle, setToggle, websiteUrl, createdAt, updatedAt, password,user, file, userId, uid}) {
    console.log(file, user)
  const[updatedModalVisibility, setUpdatedModalVisibility]=React.useState(false)
  const [updatedWebsiteUrl, setUpdatedWebsiteUrl]=React.useState(websiteUrl)
  const [updatedPassword, setUpdatedPassword]=React.useState(password)
  const [seePassword, setSeePassword]=React.useState(false)
  const [deleteBool, setDeleteBool]=React.useState(false)
  const dispatch=useDispatch()
  const modalContext=React.useContext(FormContext)
  console.log(modalContext)
    React.useEffect(()=>{
        active!==id ? setToggle(false):setToggle(true)
    },[active])

   function handleVisibility(){
       setDeleteBool(true)
   }
   function handleDisableVisibility(){
       setDeleteBool(false)
   }
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
                setActive(null)
                break;
            case "cancel":
                setUpdatedModalVisibility(false)
                break;
            case "delete":
                setDeleteBool(true)
                break;
                case "decline":
                    setDeleteBool(false)
                    break;
                    case "confirm":
                        console.log('delete credential')
                        if(file){
                            (async()=>{
                                const res=await deleteFile(id);
                                console.log(res)
                                if(res.status===200){
                                    dispatch(getFiles())
                                }
                            })()
                        }
                        else {
                            
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
                        }
                    break;
            default: setToggle(false)
        }
        
    }
    function changeStr(str){
        return str.substring(1,6)
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

    // function handleDelete(e){
    //     console.log(e.target.dataset.name)
    // }
  return (
      
      <div onClick={handleClick} className={userId===uid ? "":"pointer-events-none"}>
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
        <div className="h-[100vh] absolute inset-0 grid bg-slate-600/[0.8] place-items-center ">
            <form className='grid w-1/3 px-2 py-4 space-y-4 rounded-md md:px-6 bg-slate-800' onSubmit={handleSubmit}>
                <input type="text" className='bg-transparent focus:outline-none' placeholder='websiteUrl'  onChange={(e)=>setUpdatedWebsiteUrl(e.target.value)} value={updatedWebsiteUrl} />
                    
                <div className='flex items-center justify-between'>
                <input type={seePassword ? "text":"password"} className="bg-transparent focus:outline-none" placeholder='password' value={seePassword ? updatedPassword : changeStr(updatedPassword)} onChange={(e)=>setUpdatedPassword(e.target.value)}/>
                <VisibilityIcon onClick={()=>setSeePassword(!seePassword)} className="cursor-pointer" fontSize="medium"/>
                </div>

                <div className="flex space-x-4 place-content-end ">
                <button data-name="cancel" className='w-20 py-1 text-black bg-gray-300 rounded-md' type="button">Cancel</button>
                <button type="submit"  className='w-20 py-1 text-black bg-gray-300 rounded-md'>Submit</button>
                </div>
                
            </form>
            
        </div>:null}
        {deleteBool ? <AddModal handleDisableVisibility={handleDisableVisibility} handleVisibility={handleVisibility}>
            <div className="grid w-1/3 px-2 py-4 space-y-4 rounded-md md:px-6 bg-slate-800">
                <p>Are you sure you want to delete?</p>
                <div  className='flex space-x-4 place-content-end'>
                    <button data-name="decline" className="w-20 py-1 text-black bg-gray-300 rounded-md">Cancel</button>
                    <button data-name="confirm" className="w-20 py-1 text-black bg-gray-300 rounded-md">Yes</button>
                    
                </div>
            </div>
        </AddModal>:null}
        
        
    </div>
  )
}

export default PopUpOperations