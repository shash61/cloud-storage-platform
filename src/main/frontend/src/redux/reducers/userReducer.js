const initialState={
    user:{},
    error:'',
    loading:false
}

export const userReducer=(state=initialState, action)=>{
   const {type, payload}=action
   switch(type){
      case "FETCH_USER_REQUEST":
          return {
              ...state,
              user:{},
              loading:true,
              error:''
          }
      case "FETCH_USER_SUCCESSFUL":
          return {
              ...state,
              user:payload,
              loading:false,
              error:''
          }
      case "FETCH_USER_FAILED":
          return {
              ...state,
              user:{},
              loading:false,
              error:payload
          }
    
    default:return state;
   }
}