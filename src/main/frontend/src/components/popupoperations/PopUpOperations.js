import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function PopUpOperations({id, active, setActive, toggle, setToggle}) {
    
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
                console.log("edit")
                break;
            case "delete":
                console.log('delete')
                break;
            default: setToggle(false)
        }
        
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
        
    </div>
  )
}

export default PopUpOperations