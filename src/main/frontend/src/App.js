import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import SignUp from './components/signup/SignUp';




function App() {
  return (
    <>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='signup' element={<SignUp/>} />
        <Route path="login" element={<Login/>}/>
        <Route path="home" element={<Home/>}/>
      </Routes>
      </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;
