const initialState={
    credentials:[],
    error:'',
    loading:true
}

export const credentialReducer=(state=initialState, action)=>{
    const {type,payload}=action
    switch(type){
        case "FETCH_CREDENTIALS_REQUEST":
            return {
                ...state,
                credentials:[],
                loading:true,
                error:''
            }
        case "FETCH_CREDENTIALS_SUCCESS":
            console.log(payload)
            return {
                ...state,
                loading:false,
                credentials:payload,
                error:''
            }
        case "FETCH_CREDENTIALS_FAILED":
            return {
                ...state,
                loading:false,
                credentials:[],
                error:payload
            }

        default:return state;
    }

}