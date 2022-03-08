import React from "react";
import { data } from "../../../data/fileData";
import PaginateOperations from "../../paginateoperations/PaginateOperations";
import PopUpOperations from "../../popupoperations/PopUpOperations";
import DownloadIcon from '@mui/icons-material/Download';
console.log(data)
const headings = ["File Name", "Author", "Uploaded At"];

function TableRow({ id, fileName, uploadedAt, author ,active, setActive }) {
const [toggle, setToggle] = React.useState(false);
const [newData, setNewData]=React.useState([])
const [count, setCount]=React.useState(5)
const [page, setPage]=React.useState(1) 
// console.log(active, id)
  React.useEffect(()=>{
      
  },[])
  function handleDownload(){
    console.log(id)
  }
  return (
    <tr className="m-4 even:bg-slate-700" key={id}>
      <td className="p-4">{fileName}</td>
      <td className="p-4">{author}</td>
      <td className="p-4">{uploadedAt}</td>
      <td className="flex items-center justify-between p-4 ">
        <PopUpOperations
          id={id}
          active={active}
          setActive={setActive}
          toggle={toggle}
          setToggle={setToggle}
        />
        <DownloadIcon onClick={handleDownload} className="cursor-pointer"/>
      </td>
    </tr>
  );
}
function FileTab() {
  const [active, setActive] = React.useState();

  return (
      <div>
          
    <table className="w-full text-gray-200 border-collapse ">
      <thead className="mb-4">
        <tr >
          {headings.map((head, i) => (
              <td className="p-4 font-semibold " key={i}>{head}</td>
              ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
            data.map((item) => (
                <TableRow
                id={item?.id}
                key={item?.id}
                fileName={item?.fileName}
                uploadedAt={item?.uploadedAt}
                author={item?.author}
                active={active}
                setActive={setActive}
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
        </div>
  );
}

export default FileTab;
