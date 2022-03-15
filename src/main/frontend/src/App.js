import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthContainer from './components/auth/AuthContainer';
import Home from './components/home/Home';
import NotFound from './components/notfound/NotFound';





function App() {
  

 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*"  element={<NotFound/>}/>
        <Route path="/" element={<Home/>}>
        <Route path='auth' element={<AuthContainer/>} />
        </Route>
      </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
