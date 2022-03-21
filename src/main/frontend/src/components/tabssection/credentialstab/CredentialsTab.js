import React from "react";
import { data } from "../../../data/credentialData";
import AddComponent from "../../addcomponent/AddComponent";
import AddModal from "../../addmodal/AddModal";
import PaginateOperations from "../../paginateoperations/PaginateOperations";
import PopUpOperations from "../../popupoperations/PopUpOperations";
import {useDispatch, useSelector} from "react-redux"
import {getCredentials} from "../../../redux/actions/credentialsActions"

const headings = ["Website Url", "Credential"];

function TableRow({ id, website_url, password, active, setActive, createdAt, updatedAt, user, dispatch }) {
const [toggle, setToggle] = React.useState(false);
const [newData, setNewData]=React.useState([])
const [count, setCount]=React.useState(5)
const [page, setPage]=React.useState(1)
 
return (
  <tr className="m-4 even:bg-slate-700" key={id}>
      <td className="p-4">{website_url}</td>
      <td className="p-4">{password}</td>
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
  const [active, setActive] = React.useState();
  const [modalVisibility, setModalVisibility]=React.useState(false)
  const dispatch=useDispatch()
  const {user, error, loading:userloading}=useSelector(state=>state.userReducer || {})
  const {credentials, loading}=useSelector(state=>state.credentialReducer || {})
  console.log(user, credentials)
  
  React.useEffect(()=>{
    // dispatch()
    dispatch(getCredentials(user?.id))
  },[])
  
  function handleAddCredential(){
    console.log('adding credential')
    // console.log(active, id)
  }
  function handleVisibility(){
    setModalVisibility(true)
  }
  function handleDisableVisibility(){
    setModalVisibility(false)
  }
  const formData={
    
  }
  
  return (
      <div>
            
          <div className="grid place-content-end" onClick={handleVisibility}>
          <AddComponent text="Add Credential"/>
          </div>
          
    <table className="w-full text-gray-200 border-collapse ">
      <thead className="mb-4">
        <tr>
          {headings.map((head, i) => (
              <td className="p-4 font-semibold " key={i}>{head}</td>
              ))}
        </tr>
      </thead>
      <tbody>
        {credentials.length > 0 ? (
            credentials.map((item) => (
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
                ))
                ) : (
                    <div>
            <p>No data</p>
          </div>
        )}
      </tbody>
    </table>
       <PaginateOperations/>
       {modalVisibility ? <AddModal handleDisableVisibility={handleDisableVisibility} handleVisibility={handleVisibility}/>:null}
        </div>
  );
}

export default CredentialsTab;
