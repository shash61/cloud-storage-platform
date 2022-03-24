import { login } from "../../services/User"

export const getUserDetails=(data, error)=>{
    console.log(error)
    return async(dispatch)=>{
        dispatch({type:'FETCH_USER_REQUEST'})
        try{
            const res=await login(data);
            console.log(res)
            if(res.status===200) {
                localStorage.removeItem("token")
                localStorage.setItem("token",res?.data?.accessToken)
                dispatch({type:'FETCH_USER_SUCCESSFUL', payload:res?.data})
            }
            else error("credentials are wrong") 
        } catch(err){
            
            dispatch({type:'FETCH_USER_FAILED', payload:err.message})
        }

    }
}

export const logoutUser=()=>{
    localStorage.removeItem("token")
    return {type:'LOGOUT_USER'}
}