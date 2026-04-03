import './App.css'
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar' // Fix 1
import Home from './Pages/Home'
import Works from './Pages/Works'
import Signup1 from './Pages/Signup1'
import About from './Pages/About'
import Signup2 from './Pages/Signup2';
import Login from './Pages/Login';
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useUserData } from './context/UserdataContext';
import LoadingScreen from './Components/LodingScreen';
import secureLocalStorage from 'react-secure-storage';
function App() {
  const { user } = useAuth()
  const { setUseralldata } = useUserData();
  const [Isloginuser, setIsIsloginuser] = useState(false)
  useEffect(() => {
    const CheckUserLogin = async () => {
      const token = await user?.getIdToken();
      const localtoken = secureLocalStorage.getItem('auth-token');
      console.log(token)
      console.log(localtoken)
      if (localtoken) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getuser`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
        });
        const data = await response.json();
      }
      if (token) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        console.log(data.userdata)
        setUseralldata(data.userdata)
      }
      setIsIsloginuser(true)

    }
    CheckUserLogin();
  }, [user])
  if (!Isloginuser)
    return (
      <LoadingScreen />

    )
  if (Isloginuser) {
    return (
      <BrowserRouter>
        <Navbar />
        <ToastContainer transition={Flip} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Works' element={<Works />} />
          <Route path='/signup' element={<Signup1 />} />
          <Route path='/About' element={<About />} />
          <Route path='/Signup2' element={<Signup2 />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    )
  }



}
export default App;
