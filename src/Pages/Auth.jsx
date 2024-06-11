import React, { useState } from 'react'
import login from "../assets/login.png"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from '../services/allAPI';

const Auth = ({ insideRegister }) => {
  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })
  const navigate = useNavigate()

  console.log(userData);

  const handleRegister= async(e)=>{
    e.preventDefault()
    if (userData.username && userData.email && userData.password) {
      // api call
      try {
        const result = await registerAPI(userData)
        console.log(result);
        if (result.status==200) {
          toast.warning(`welcome ${result?.data?.username} please login`)
          setUserData({
            username:"",email:"",password:""
          })
          navigate('/login')
        } else {
          if (result.response.status==406) {
            toast.error(result.response.data)
            setUserData({
              username:"",email:"",password:""
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
      
    } else {
      toast.info("Please fill the form!!")
    }
  }

  return (
    <div style={{ width: "100%", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <div className='card shadow p-2'>
          <div className='row align-items-center'>
            <div className="col-lg-6">
              <img className='w-100' src={login} alt="login" />
            </div>
            <div className="col-lg-6">
              <h1 className='fw-bolder mt-2'><i className="fa-brands fa-hubspot"></i> Project Fair</h1>
              <h5 className='fw-bolder mt-2'>
                Sign {insideRegister ? "Up" : "In"} to your Account
              </h5>
              <Form>
                {insideRegister &&
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} type="text" placeholder="Username" />
                  </FloatingLabel>
                }
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister?
                    <div className="mt-3">
                      <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                      <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                  :
                  <div className="mt-3">
                  <button className='btn btn-primary mb-2'>Login</button>
                  <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                </div>
                }

              </Form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Auth
