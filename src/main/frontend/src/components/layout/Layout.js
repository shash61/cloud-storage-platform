import Navbar from "../navbar/Navbar";

export default function Layout({children}){
    return (
      <div className="h-[100vh] overflow-hidden ">
       <Navbar/>
       <div className="grid h-full mx-auto bg-gray-800 ">
       {children}
       </div>
  
      </div>
    )
  }