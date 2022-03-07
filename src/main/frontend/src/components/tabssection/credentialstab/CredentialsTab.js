import React from "react";
import { data } from "../../../data/credentialData";
import PaginateOperations from "../../paginateoperations/PaginateOperations";
import PopUpOperations from "../../popupoperations/PopUpOperations";

const headings = ["Website Url", "Credential"];

function TableRow({ id, website_url, password, active, setActive }) {
const [toggle, setToggle] = React.useState(false);
const [newData, setNewData]=React.useState([])
const [count, setCount]=React.useState(5)
const [page, setPage]=React.useState(1) 
// console.log(active, id)
  React.useEffect(()=>{
      
  },[])
  return (
    <tr className="m-4 even:bg-slate-700" key={id}>
      <td className="p-4">{website_url}</td>
      <td className="p-4">{password}</td>
      <td className="p-4">
        <PopUpOperations
          id={id}
          active={active}
          setActive={setActive}
          toggle={toggle}
          setToggle={setToggle}
        />
      </td>
    </tr>
  );
}
function CredentialsTab() {
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
                website_url={item?.website_url}
                password={item?.password}
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

export default CredentialsTab;
