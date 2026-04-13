import './App.css'
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Works from './Pages/Works'
import Signup1 from './Pages/Signup1'
import About from './Pages/About'
import Signup2 from './Pages/Signup2';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Requriment from './Pages/Requriment';
import Requirement2 from "./Pages/Requirement2";
import Requirement from './Pages/PostRequirement';

import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useUserData } from './context/UserdataContext';
import LoadingScreen from './Components/LodingScreen';
import secureLocalStorage from 'react-secure-storage';

function App() {
  const { user } = useAuth();
  const { setUseralldata } = useUserData();
  const [Isloginuser, setIsIsloginuser] = useState(false);

  useEffect(() => {
    const CheckUserLogin = async () => {
      try {
        const token = await user?.getIdToken();
        const localtoken = secureLocalStorage.getItem('auth-token');

        if (localtoken) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getuser`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localtoken
            },
          });
          const data = await response.json();
          setUseralldata(data.userdata);
        }

        if (token) {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getuser`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();
          setUseralldata(data.userdata);
        }

        setIsIsloginuser(true);

      } catch (error) {
        console.log(error);
        setIsIsloginuser(true);
      }
    };

    CheckUserLogin();
  }, [user]);

  if (!Isloginuser) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer transition={Flip} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/works' element={<Works />} />
        <Route path='/signup' element={<Signup1 />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup2' element={<Signup2 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Requirement2' element={<Requirement2 />} />
        <Route path='/Requriment' element={<Requriment />} />
        <Route path='/postrequiremen' element={<Requirement />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;