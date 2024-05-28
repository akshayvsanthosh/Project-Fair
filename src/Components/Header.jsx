import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <Navbar style={{zIndex:"10"}} className="position-fixed w-100 top-0 border rounded">
        <Container>
          <Navbar.Brand>
            <Link className='fw-bolder' to={'/'} style={{textDecoration:"none", color:"white"}}>
              <i className='fa-brands fa-hubspot'></i> Project Fair
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
