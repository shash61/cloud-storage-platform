import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useForm from "../../hooks/useForm";
import { registerUser } from "../../services/User";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ToastPopup from "../toastpopup/ToastPopup";


function SignUp({ setValue }) {
  const [type, setType] = React.useState("password");
  const [bool, setBool] = React.useState(false);

  const [state, handleChange, handleSubmit, allClear] = useForm(handleRegister);
  const [error, setError] = React.useState(false);
  const notify=(text)=>{
    toast.dark(text)
  }
  const navigate = useNavigate();
  console.log(handleSubmit);
  function handleRegister() {
    const newData = {
      ...state,
      // createdAt:new Date().toISOString(),
      // lastloginAt:new Date()
    };
    // setBool(true)
    // console.log(state)

    (async () => {
     
        const res = await registerUser(newData);
        console.log(res);
        if (res?.status === 200 ) {
          notify(res.data.message)
          setTimeout(() => setValue(1), 3000);
        }
        
          else{
            console.log('error')
          notify("user is already registered")
          }// setBool(true);
          // setError(true);
        
      // setBool(false)
      // setError(false)
    })();
    allClear();
    console.log(registerUser);
    console.log(newData, "submit");
  }
  function handleType() {
    setType((prev) => {
      return prev === "password" ? "text" : "password";
    });
  }
  return (
    <div className="grid place-content-center">
      <div className="p-4 text-gray-100 rounded-md w-[500px] mx-auto bg-slate-700">
        <form className="grid space-y-4" onSubmit={handleSubmit}>
          <input
            className="p-2 bg-transparent border-b focus:outline-none"
            type="text"
            placeholder="Enter Name"
            autoFocus={true}
            value={state.username || ""}
            onChange={(e) => handleChange(e)}
            required={true}
            minLength={4}
            name="username"
          />
          <input
            className="p-2 bg-transparent border-b focus:outline-none"
            type="email"
            placeholder="Enter Email"
            value={state.email || ""}
            name="email"
            onChange={(e) => handleChange(e)}
            required={true}
          />
          <div className="flex items-center justify-between border-b">
            <input
              className="w-full p-2 bg-transparent focus:outline-none"
              type={type}
              placeholder="Enter Password"
              value={state.password || ""}
              name="password"
              onChange={(e) => handleChange(e)}
              required={true}
              minLength={8}
            />
            {state.password !== undefined && state.password.length > 0 && (
              <VisibilityIcon
                onClick={handleType}
                className="mx-4 cursor-pointer"
              />
            )}
          </div>

          <div className="flex mt-2 space-x-4 place-content-end">
            <button className="btncontainer" type="submit">
              Register
            </button>
            <button
              className="btncontainer"
              onClick={() => allClear()}
              type="button"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
     <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default SignUp;
