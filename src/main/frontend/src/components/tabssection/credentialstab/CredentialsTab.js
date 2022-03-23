import React from "react";
import nodata from '../../../assets/nodata.png'
import AddComponent from "../../addcomponent/AddComponent";
import AddModal from "../../addmodal/AddModal";
import PaginateOperations from "../../paginateoperations/PaginateOperations";
import PopUpOperations from "../../popupoperations/PopUpOperations";
import {useDispatch, useSelector} from "react-redux"
import {getCredentials} from "../../../redux/actions/credentialsActions"
import VisibilityIcon from "@mui/icons-material/Visibility";
import useForm from "../../../hooks/useForm";
import { addCredential } from "../../../services/Credential";

const headings = ["Website Name", "Credential"];

function TableRow({ id, website_url, password, active, setActive, createdAt, updatedAt, user, dispatch }) {
const [toggle, setToggle] = React.useState(false);
const [newData, setNewData]=React.useState([])
const [count, setCount]=React.useState(5)
const [page, setPage]=React.useState(1)
const [seePassword, setSeePassword]=React.useState(false)
 function changeString(str){
   return str.substring(1,6)
 }
return (
  <tr className="m-4 even:bg-slate-700" key={id}>
      <td className="p-4">{website_url}</td>
      <td className="flex items-center justify-between w-full p-4">
        {!seePassword ? 
        <input className="bg-transparent pointer-events-none" type="password" value={changeString(password)}/>:
        <span>
        {password}
        </span>
        }
        
        <VisibilityIcon className="cursor-pointer" onClick={()=>setSeePassword(!seePassword)} fontSize="medium"/>        
        </td>
      <td className="p-4">
        <PopUpOperations
          id={id}
          websiteUrl={website_url}
          password={password}
          createdAt={createdAt}
          updatedAt={updatedAt}
          active={active}
          setActive={setActive}
          toggle={toggle}
          setToggle={setToggle}
          user={user}
          dispatch={dispatch}
          />
      </td>
    </tr>
  );
}

function CredentialsTab() {
  const [active, setActive] = React.useState(null);
  const [modalVisibility, setModalVisibility]=React.useState(false)
  const dispatch=useDispatch()
  const {user, error, loading:userloading}=useSelector(state=>state.userReducer || {})
  const {credentials, currentPage, totalPage,loading}=useSelector(state=>state.credentialReducer || {})
  const [state, handleChange, handleSubmit, allClear]=useForm(handleAddCredential)
  console.log(user, credentials)
  const [passwordVisbility, setPasswordVisibility]=React.useState(false)
  
  React.useEffect(()=>{
    dispatch(getCredentials(user?.id,0,2))
  },[])
  
  function handleAddCredential(){
    console.log('adding credential')
    const newState={
      ...state,
      createdAt:new Date().toISOString(),
      updatedAt:new Date().toISOString()
  }
  console.log( newState,'submit');
  (async()=>{
      try{
          const res=await addCredential(newState,user?.id)
          console.log(res)
          if(res.status===200){
              handleDisableVisibility()
              allClear()
              dispatch(getCredentials(user?.id))
          }
      }catch(err){
          console.log(err)
      }
  })()
    // console.log(active, id)
  }
  function handleVisibility(){
    setModalVisibility(true)
  }
  function handleDisableVisibility(){
    setModalVisibility(false)
  }

  function handlePasswordVisibility(){
    setPasswordVisibility(!passwordVisbility)
  }
  return (
      <div>
            
          <div className="grid place-content-end" >
          <AddComponent text="Add Credential" handleClick={handleVisibility}/>
          </div>
          
          {credentials?.length > 0 ? (
            <>
    <table className="w-full text-gray-200 border-collapse ">
      <thead className="mb-4">
        <tr>
          {headings.map((head, i) => (
              <td className="p-4 font-semibold " key={i}>{head}</td>
              ))}
        </tr>
      </thead>
      <tbody>
            {credentials?.map((item) => (
                <TableRow
                id={item?.id}
                key={item?.id}
                website_url={item?.websiteUrl}
                password={item?.password}
                active={active}
                setActive={setActive}
                createdAt={item?.createdAt}
                updatedAt={item?.updatedAt}
                user={user}
                dispatch={dispatch}
                />
                ))}
      </tbody>
    </table>
                  <PaginateOperations totalPage={totalPage} currentPage={currentPage} userId={user?.id} />
                  </>
                ) : (
                  <div className="grid mt-8 place-content-center">
                  <img src={nodata} className="w-56 h-56" alt=""/>
                  </div>
                    )}
       {modalVisibility ? <AddModal handleDisableVisibility={handleDisableVisibility} handleVisibility={handleVisibility}>
         <form
        onSubmit={handleSubmit}
        data-name="child"
        className="grid w-1/3 px-2 py-4 space-y-4 rounded-md md:px-6 bg-slate-800"
      >
        <input
          name="websiteUrl"
          className="text-white bg-transparent focus:outline-none"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Website Name"
          required={true}
          minLength={4}
          value={state.websiteUrl || ""}
        />

        <div className="flex items-center justify-between">
        <input
          className="text-white bg-transparent focus:outline-none"
          type={passwordVisbility ? "text":"password"}
          placeholder="Website credential"
          required={true}
          minLength={8}
          name="password"
          onChange={(e) => handleChange(e)}
          value={state.password || ""}
          />
          <VisibilityIcon fontSize="medium" className="text-white cursor-pointer" onClick={handlePasswordVisibility}/>
          </div>

        <div className="flex space-x-4 place-content-end">
          <button
            data-name="cancel"
            className="w-20 py-1 text-black bg-gray-300 rounded-md"
            type="button"
          >
            Cancel
          </button>
          <button
            className="w-20 py-1 text-black bg-gray-300 rounded-md"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
       </AddModal>:null}
        </div>
  );
}

export default CredentialsTab;
