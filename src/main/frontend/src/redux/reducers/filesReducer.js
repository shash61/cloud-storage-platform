const initialState={
    files:[],
    loading:true,
    error:''
}

export const filesReducer=(state=initialState, action)=>{
    const {type, payload}=action
    switch(type){
        case "FETCH_FILES_REQUEST":
            return {
                ...state,
                files:[],
                loading:true,
                error:''
            }
        case "FETCH_FILES_SUCCESS":
            return {
                ...state,
                loading:false,
                files:payload,
                error:''
            }
        case "FETCH_FILES_FAILED":
            return {
                ...state,
                loading:false,
                files:[],
                error:payload
            }
        case "FILTER_MYFILES":
            console.log(payload)
            const newFiles=payload.files.filter((file)=>file.uid===payload.id);
            console.log(newFiles);
            return {
                ...state,
                loading:false,
                files:newFiles,
                error:''
            };
        default:return state;
    }
}