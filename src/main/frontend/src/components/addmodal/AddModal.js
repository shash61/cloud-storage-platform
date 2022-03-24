import React from "react";
import AddComponent from "../addcomponent/AddComponent";
import useForm from "../../hooks/useForm";
import { addCredential } from "../../services/Credential";
import { useDispatch, useSelector } from "react-redux";
import { getCredentials } from "../../redux/actions/credentialsActions";

export const FormContext=React.createContext()
function AddModal({
  children,
  handleVisibility,
  handleDisableVisibility,
  formData,
  allClear
}) {
  console.log(handleVisibility, handleDisableVisibility);

 
  const { user, loading } = useSelector((state) => state.userReducer || {});
  const dispatch = useDispatch();

  function handleClick(e) {
    console.log(e.target.dataset.name);
    switch (e.target.dataset.name) {
      case "parent":
        handleDisableVisibility();
       allClear!==undefined && allClear()
        break;
      case "cancel":
        handleDisableVisibility();
        allClear!==undefined && allClear()
        break;
      default:
        return;
    }
  }
  // function handleAddModal(e) {
  //   console.log(state);
  //   const newState = {
  //     ...state,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   };
  //   console.log(newState, "submit");
  //   (async () => {
  //     try {
  //       const res = await addCredential(newState, user?.id);
  //       console.log(res);
  //       if (res.status === 200) {
  //         handleDisableVisibility();
  //         dispatch(getCredentials(user?.id));
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }
  
  return (
    <div
      data-name="parent"
      onClick={handleClick}
      className="h-[100vh] absolute inset-0 grid place-items-center bg-slate-600/[0.8]"
    >
      <FormContext.Provider value={{handleDisableVisibility, handleVisibility, handleClick}}>
        {children}
      </FormContext.Provider>
      {/* <form
        onSubmit={handleSubmit}
        data-name="child"
        className="grid w-1/3 px-2 py-4 space-y-4 rounded-md bg-slate-800"
      >
        <input
          name="websiteUrl"
          className="text-white bg-transparent focus:outline-none"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Website Name"
          required={true}
          value={state.websiteUrl || ""}
        />
        <input
          className="text-white bg-transparent focus:outline-none"
          type="password"
          placeholder="Website credential"
          required={true}
          name="password"
          onChange={(e) => handleChange(e)}
          value={state.password || ""}
        />

        <div className="flex space-x-4 place-content-end">
          <button
            data-name="cancel"
            className="w-20 py-1 text-white rounded-md hover:bg-gray-300 hover:text-black"
            type="button"
          >
            Cancel
          </button>
          <button
            className="w-20 py-1 text-white rounded-md hover:bg-gray-300 hover:text-black"
            type="submit"
          >
            Add
          </button>
        </div>
      </form> */}
    </div>
  );
}

export default AddModal;
