import { login } from "../../services/User"

export const getUserDetails=(data)=>{
    return async(dispatch)=>{
        dispatch({type:'FETCH_USER_REQUEST'})
        try{
            const res=await login(data);
            console.log(res)
            dispatch({type:'FETCH_USER_SUCCESSFUL', payload:res?.data})
        } catch(err){
            dispatch({type:'FETCH_USER_FAILED', payload:err.message})
        }

    }
}