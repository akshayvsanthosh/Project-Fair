import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { tokenAuthContext } from '../Contexts/AuthContext';


function Header({insideDashboard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <>
      <Navbar style={{zIndex:"10"}} className="position-fixed w-100 top-0 border rounded">
        <Container>
          <Navbar.Brand>
            <Link className='fw-bolder' to={'/'} style={{textDecoration:"none", color:"white"}}>
              <i className='fa-brands fa-hubspot'></i> Project Fair
            </Link>
          </Navbar.Brand>
          {
            insideDashboard &&
            <div className='ms-auto'>
              <button onClick={handleLogout} style={{textDecoration:"none"}} className='btn btn-link fw-bolder'>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header
