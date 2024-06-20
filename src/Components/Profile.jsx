import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import profileImg from "../assets/profileImg.png";
import SERVERURL from '../services/serverurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { editUserAPI } from '../services/allAPI';

function Profile() {
  const [preview,setPreview] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilePic: ""
  })
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github, linkedin: existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.profilePic)
    }
  }, [open])

  useEffect(()=>{
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUpdate = async () =>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if (github && linkedin) {
      const reqbody = new FormData()
      reqbody.append("username",username)
      reqbody.append("email",email)
      reqbody.append("password",password)
      reqbody.append("github",github)
      reqbody.append("linkedin",linkedin)
      preview?reqbody.append("profilePic",profilePic):reqbody.append("profilePic",existingImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // api call
        try {
          const result = await editUserAPI(reqbody,reqHeader)
          if (result.status==200) {
            setOpen(!open)
            sessionStorage.setItem("user",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        } catch (error) {
          console.log(error);
        }
      }  
    }else{
      toast.warning("Please fill the form completely")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <h3 className="text-warning">Profile</h3>
        <button onClick={() => setOpen(!open)} className="btn text-warning fw-bolder"><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className="row align-items-center justify-content-center shadow rounded p-3" id="example-collapse-text">
          <label className="text-center mb-2">
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{ display: "none" }} />
          { existingImg==""?
            <img src={preview?preview:profileImg} alt="ProfileImg" width={"200px"} height={"200px"} className='rounded-circle' />
            :
            <img src={preview?preview:`${SERVERURL}/uploads/${existingImg}`} alt="ProfileImg" width={"200px"} height={"200px"} className='rounded-circle' />
          }
          </label>
          <div className="mb-2">
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" placeholder='GITHUB URL' className='form-control' />
          </div>
          <div className="mb-2">
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" placeholder='LINKEDIN URL' className='form-control' />
          </div>
          <div className="d-grid">
            <button onClick={handleUpdate} className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      </Collapse>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Profile
