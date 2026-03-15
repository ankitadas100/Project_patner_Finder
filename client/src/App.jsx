import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar' // Fix 1
import Home from './Pages/Home'
import Works from './Pages/Works'
import Signup1 from './Pages/Signup1'
import { ToastContainer, Flip } from 'react-toastify'
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer transition={Flip} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Works' element={<Works />} />
        <Route path='/signup' element={<Signup1 />} />
      </Routes>

    </BrowserRouter>
  )


}
export default App;
