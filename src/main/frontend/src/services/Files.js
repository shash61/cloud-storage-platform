import axios from 'axios'


export async function getAllFiles(){
    try{
        const res=await axios.get(`${process.env.REACT_APP_API_URL}/test/files`,
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
        console.log(res)
        return res;
    }catch(err){
        console.log(err)
        return err;
    }
}

export async function addFile(data,userId){
    try{
      const res=await axios.post(`${process.env.REACT_APP_API_URL}/test/files/add/${userId}`,
      data,
      {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        }
      })
      console.log(res)
      return res;
    }catch(err){
        console.log(err.message)
        return err;
    }
}

export async function downloadFile(fileId){
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_URL}/test/files/download/${fileId}`, 
       {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
            
        }
       })
      console.log(res?.data?.json())
      return res;

    }catch(err){
        console.log(err)
        return err;
    }
}

export async function deleteFile(fileId){
    try {
        const res=await axios.delete(`${process.env.REACT_APP_API_URL}/test/files/delete/${fileId}`,
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )
        return res;
    } catch (error) {
        return error.message
    }
}