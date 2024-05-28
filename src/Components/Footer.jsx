import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div   className='container mt-5 w-100'>
      <div className="d-lg-flex justify-content-between ">
        <div style={{width:'400px'}} className="intro">
          <h5><i className="fa-brands fa-hubspot"></i> Project Fair</h5>
          <p>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
          <p>Code licensed MIT, docs CC BY 3.0.Currently</p>
          <p>v5.3.2.</p>
        </div>
        <div className="links d-flex flex-column ">
          <h5>Links</h5>
          <Link to={'/'} style={{textDecoration:'none', color:'white'}}>Home</Link>
          <Link to={'/login'} style={{textDecoration:'none', color:'white'}}>Login</Link>
          <Link to={'/register'} style={{textDecoration:'none', color:'white'}}>Register</Link>
        </div>
        <div className="guides d-flex flex-column ">
          <h5>Guides</h5>
          <a href="https://react.dev/" target='_blank' style={{textDecoration:'none', color:'white'}}>React JS</a>
          <a href="https://reactrouter.com/en/main" target='_blank' style={{textDecoration:'none', color:'white'}}>React Routing</a>
          <a href="https://react-bootstrap.github.io/" target='_blank' style={{textDecoration:'none', color:'white'}}>React Bootstrap</a>
        </div>
        <div className="contact d-flex flex-column ">
          <h5>Contact Us</h5>
          <div className="d-flex">
            <input placeholder='Email Id Please' type="text" className='form-control '/>
            <button className='btn btn-info ms-2'><i className='fa-solid fa-arrow-right'></i></button>
          </div>
          <div className='icons d-flex justify-content-between mt-3'>
            <a href="" style={{textDecoration:'none', color:'white'}} target='_blank'>
              <i className='fa-brands fa-twitter'></i>
            </a>
            <a href="" style={{textDecoration:'none', color:'white'}} target='_blank'>
              <i className='fa-brands fa-instagram'></i>
            </a>
            <a href="" style={{textDecoration:'none', color:'white'}} target='_blank'>
              <i className='fa-brands fa-facebook'></i>
            </a>
            <a href="" style={{textDecoration:'none', color:'white'}} target='_blank'>
              <i className='fa-brands fa-linkedin'></i>
            </a>
            <a href="" style={{textDecoration:'none', color:'white'}} target='_blank'>
              <i className='fa-brands fa-github'></i>
            </a>
            <a href="" style={{textDecoration:'none', color:'white'}} target='_blank'>
              <i className='fa-solid fa-phone'></i>
            </a>
          </div>
        </div>
      </div>
        <p className='text-center mt-5'>Copyright © 2024 Project Fair. Built with React.</p>
      
    </div>
  )
}

export default Footer
