import axios from "axios";

export async function addCredential(data, userId) {
  console.log(data, userId);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/test/credentials/add/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCredentials(userId, pageNo) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/test/credentials/${userId}?pageNo=${pageNo || 0}&size=2`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function updateCredential(credentialId, data,userId) {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/test/credentials/update/${credentialId}?userId=${userId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCredential(credentialId, data, userId) {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/test/credentials/delete/${credentialId}?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        data: data,
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}
