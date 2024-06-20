import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Projects from './Pages/Projects'
import DashBoard from './Pages/Dashboard'
import Footer from './Components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './Contexts/AuthContext'


function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister={true}/>}/>
        <Route path='/projects' element={isAuthorised ? <Projects/>:<Navigate to={'/login'}/>}/>
        <Route path='/dashboard' element={isAuthorised?<DashBoard/>:<Navigate to={'/login'}/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
