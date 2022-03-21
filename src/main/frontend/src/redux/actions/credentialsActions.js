import { getAllCredentials } from "../../services/Credential"

export const getCredentials=(userId)=>{
    console.log(userId)
    return async(dispatch)=>{
        dispatch({type:'FETCH_CREDENTIALS_REQUEST'})
        try{ 
           const res=await getAllCredentials(userId)
           console.log(res)
           dispatch({type:"FETCH_CREDENTIALS_SUCCESS", payload:res?.data})
        }catch(err){
            console.log(err)
            dispatch({type:"FETCH_CREDENTIALS_FAILED", payload:err.message})
        }
    }

}