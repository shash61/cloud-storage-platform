import axios from "axios";

export async function registerUser(data) {
  console.log(data);
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, 
      data,
      {
          headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
