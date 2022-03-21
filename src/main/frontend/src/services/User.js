import axios from "axios";

export async function registerUser(data) {
  console.log(data);
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, 
      data,
      {
          headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(res)
    return res;
  } catch (error) {
    console.log(error.message);
  }
}


export async function login(data){
  console.log(data)
  try {
    const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, 
     data, 
     {
      headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
});
    console.log(res)
    return res;
  } catch (error) {
    return error
  }
}