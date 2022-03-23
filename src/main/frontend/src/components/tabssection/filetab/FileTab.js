import React, { useRef } from "react";
import { data } from "../../../data/fileData";
import PaginateOperations from "../../paginateoperations/PaginateOperations";
import PopUpOperations from "../../popupoperations/PopUpOperations";
import DownloadIcon from '@mui/icons-material/Download';
import AddComponent from "../../addcomponent/AddComponent";
import AddModal, { FormContext } from "../../addmodal/AddModal";
import useForm from "../../../hooks/useForm";
import { addFile, downloadFile } from "../../../services/Files";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../../redux/actions/fileactions";
import nodata from '../../../assets/nodata.png'
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

console.log(data)
const headings = ["File Name", "Author","Uploaded At"];

function TableRow({ id, fileName, uploadedAt, author ,active, setActive, url, type:fileType, uid, userId }) {
  console.log(uid,id,'props')
const [toggle, setToggle] = React.useState(false);
const [newData, setNewData]=React.useState([])
const [count, setCount]=React.useState(5)
const [page, setPage]=React.useState(1)
const [bloburl, setUrl]=React.useState('') 
// console.log(active, id)
console.log(fileName.split(fileType.split('/')[1])[0])
  React.useEffect(()=>{
      
  },[])

  return (
    <tr className="m-4 even:bg-slate-700" key={id}>
      <td className="p-4 max-w-[40px] whitespace-nowrap overflow-x-scroll">{fileName}</td>
      <td className="p-4">{author}</td>
      <td className="p-4">{uploadedAt}</td>
      <td className="flex items-center justify-between p-4 ">
        <PopUpOperations
          id={id}
          active={active}
          setActive={setActive}
          toggle={toggle}
          setToggle={setToggle}
          userId={userId}
          uid={uid}
          file
        />


        <a href={`${process.env.REACT_APP_API_URL}/test/files/download/${id}`} >
        <DownloadIcon  className="cursor-pointer"/>
        </a>
        
      </td>
    </tr>
  );
}


function FileTab() {
  const [active, setActive] = React.useState();
  const [modalVisibility, setModalVisibility]=React.useState(false)
  const [activeButton, setActiveButton]=React.useState('')
  const {user}=useSelector(state=>state.userReducer || {})
  const {files}=useSelector(state=>state.filesReducer || {})
  const btnRef=useRef()
  const btnRef2=useRef()
  const [state, handleChange, handleSubmit, allClear]=useForm(handleAddFile)
  const [file, setFile]=React.useState(null)
  const dispatch=useDispatch()
  const notify=()=>{
    toast.dark("file size exceeded")
  }
  console.log(files)
  
  React.useEffect(()=>{
    setActiveButton(btnRef.current.dataset.id)
    dispatch(getFiles())
    console.log(btnRef.current)
    console.log(btnRef2.current)
  },[])

  React.useEffect(()=>{
    console.log('active', activeButton)
    if(activeButton==1){
      console.log('fetching all data')
    }
    if(activeButton==2){
      console.log('fetching my data')
    }
  },[activeButton])
  
  function handleClick(e){
    // console.log(e.target.dataset.name)
    if(e.target.dataset.name==='allfiles' && activeButton!=1){
      dispatch(getFiles())
      setActiveButton(e.target.dataset.id)
     
    }    if(e.target.dataset.name==="myfiles" && activeButton!==2){
       dispatch({type:"FILTER_MYFILES", payload:{files, id:user?.id}})
      setActiveButton(e.target.dataset.id)
      
    }
  }
  
  function handleAddFile(){
    console.log(file);
    const formfile=file;
    const formData=new FormData();
    formData.append("file", formfile);
    (async()=>{
      const res=await addFile(formData, user?.id)
      console.log(res)
      if(res.status===200){
        allClear()
        handleDisableVisibility()
        dispatch(getFiles())
      }
      else notify()
    })()
    console.log('adding file') 
  }
  
  function handleVisibility(){
    setModalVisibility(true)
  }
  
  function handleDisableVisibility(){
    setModalVisibility(false)
  }
  
 
  return (
    <div className="">
        <div onClick={handleClick} className="flex items-center justify-between mt-8">
          <div className="flex items-center space-x-6 " >
            <button data-id="1" data-name="allfiles" ref={btnRef} className={activeButton===btnRef?.current?.dataset.id ? "p-2 text-white border-b-2 border-slate-300 font-semibold" :"text-white"}>All Files</button>
            <button data-id="2" ref={btnRef2} data-name="myfiles" className={activeButton===btnRef2?.current?.dataset.id ? "p-2 text-white border-b-2 font-semibold border-slate-300 ":"text-white"}>My Files</button>
          </div>

          
          <AddComponent text="Add File" handleClick={handleVisibility} />
          
          </div>
            
          {files?.length > 0 ? (
            <>
            <table className="w-full mt-16 text-gray-200 border-collapse ">
      <thead className="mb-4">
        <tr>
          {headings.map((head, i) => (
            <td className="p-4 font-semibold " key={i}>{head}</td>
            ))}
        </tr>
      </thead>
      <tbody>
        
          {  files?.map((item) => (
            <TableRow
            id={item?.id}
            key={item?.id}
            fileName={item?.name}
            uploadedAt={item?.updatedAt}
            author={item?.userName}
            active={active}
            setActive={setActive}
            url={item?.url}
            type={item?.contentType}
            uid={item?.uid}
            userId={user?.id}
            
            />
            ))}
      </tbody>
    </table>
        <PaginateOperations/>
            </>
        )
         : (
           
           <div className="grid mt-8 place-content-center">
          <img src={nodata} className="w-56 h-56" alt=""/>
          </div>
         )}
       {modalVisibility ? <AddModal handleDisableVisibility={handleDisableVisibility} handleVisibility={handleVisibility} allClear={allClear}>
         <form onSubmit={handleSubmit}
          data-name="child"
          className="grid w-1/3 px-2 py-4 space-y-4 rounded-md bg-slate-800"
         >
        <input type="file" className="mb-4 text-white" onChange={(e)=>setFile(e.target.files[0])}
          name="file"
        />
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
       <ToastContainer autoClose={2000}/>
        </div>
  );
}

export default FileTab;
