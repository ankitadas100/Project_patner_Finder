import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './Components/Navbar' // Fix 1
import Home from './Pages/Home'
import Works from './Pages/Works'
import Signup1 from './Pages/Signup1'
import About from './Pages/About'
function App() {
  
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/Works' element={<Works />} />
  <Route path='/signup1' element={<Signup1 />} /> 
   <Route path='/About' element={<About />} /> 
</Routes>
    
    </BrowserRouter>
  )
  
  
}
export default App;