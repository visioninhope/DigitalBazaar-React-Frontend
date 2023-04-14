import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import SignUp from './pages/Authentication/SignUp';
import Login from './pages/Authentication/Login';
import { getUserThunk, setIsAuthenticated } from './store/slice/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import UserNotFound from './pages/UserNotFound';
function App() {

  const dispatch = useDispatch()
  useEffect(()=> {
    const token = localStorage.getItem("authToken")
    if(token === "" || token === " " || token === undefined || token === null || token === "null") {
      dispatch(setIsAuthenticated(false))
    }
    else {
      dispatch(getUserThunk())
    }
  },[])
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/> 
          <Route path='/userNotFound' element={<UserNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
