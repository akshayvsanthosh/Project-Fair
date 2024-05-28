import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Projects from './Pages/Projects'
import DashBoard from './Pages/Dashboard'
import Footer from './Components/Footer'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister={true}/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
