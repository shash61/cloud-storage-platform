const initialState={
    credentials:[],
    error:'',
    loading:true,
    currentPage:0,
    totalPage:0,
}

export const credentialReducer=(state=initialState, action)=>{
    const {type,payload}=action
    switch(type){
        case "FETCH_CREDENTIALS_REQUEST":
            return {
                ...state,
                credentials:[],
                currentPage:0,
                totalPage:0,
                loading:true,
                error:''
            }
        case "FETCH_CREDENTIALS_SUCCESS":
            console.log(payload)
            return {
                ...state,
                loading:false,
                credentials:payload.credentials,
                currentPage:payload.currentPage,
                totalPage:payload.totalPages,
                error:''
            }
        case "FETCH_CREDENTIALS_FAILED":
            return {
                ...state,
                loading:false,
                credentials:[],
                currentPage:0,
                totalPage:0,
                error:payload
            }

        default:return state;
    }

}