import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import TabsSection from "../tabssection/TabsSection";

function Home() {
  const { user } = useSelector((state) => state.userReducer || {});
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if(localStorage.getItem("token")!==null || undefined) {
      setLoggedIn(true) 
      navigate('/')
    } else{
      navigate('/auth')
      setLoggedIn(false);
    }
  }, [user]);
  return <Layout>{loggedIn ? <TabsSection /> : <Outlet />}</Layout>;
}

export default Home;
