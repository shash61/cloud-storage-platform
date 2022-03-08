import React from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function PaginateOperations() {
    function handleClick(e){
        console.log(e.target.dataset)
    }
  return (
    <div className="flex mt-4 text-gray-200 place-content-end">
        Page 1 of 5
        <div className='flex items-center ml-4 space-x-4' onClick={handleClick} >
            <div className="cursor-pointer" data-name="left">
            <ArrowCircleLeftIcon  className="pointer-events-none" />
            </div>
            
            <div data-name="right" className="cursor-pointer">
            <ArrowCircleRightIcon className="pointer-events-none" />
            </div>

                
        </div>
    </div>
  )
}

export default PaginateOperations