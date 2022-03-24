import {getAllFiles} from '../../services/Files'

export const getFiles=()=>{
    return async(dispatch)=>{
       dispatch({type:'FETCH_FILES_REQUEST'})
       try {
           const res=await getAllFiles()
           console.log(res)
           dispatch({type:"FETCH_FILES_SUCCESS", payload:res?.data})
       } catch (error) {
           dispatch({type:"FETCH_FILES_FAILED", payload:error.message})
       }
    }
}