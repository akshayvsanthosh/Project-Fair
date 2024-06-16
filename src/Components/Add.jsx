import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import addImage from '../assets/addImage.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addProjectAPI } from '../services/allAPI';

function Add() {
  const [preview,setPreview] = useState(addImage)
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [projectDetails,setProjectDetails]=useState({
    title:"",language:"",github:"",website:"",overview:"",projectImg:""
  })
  const [show, setShow] = useState(false);
  const handleClose = () =>{
      setProjectDetails({
        title:"",language:"",github:"",website:"",overview:"",projectImg:""
      })
     setShow(false);
    }
  const handleShow = () => setShow(true);

  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }else{
      setImageFileStatus(false)
      setProjectDetails({...projectDetails,projectImg:""})
      setPreview(addImage)
    }
  },[projectDetails.projectImg])

  const handleAdd = async() =>{
    const {title,language,github,website,overview,projectImg} = projectDetails
    if (projectDetails.title && projectDetails.language && projectDetails.github && projectDetails.website && projectDetails.overview && projectDetails.projectImg) {
      // api call :- reqbody,reqheader(because this api call as media file)(multipart/form-data is the type here)
      // reqbody
      const reqbody = new FormData
      reqbody.append("title",title)
      reqbody.append("language",language)
      reqbody.append("github",github)
      reqbody.append("website",website)
      reqbody.append("overview",overview)
      reqbody.append("projectImg",projectImg)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // api call - reqbody, reqheader
        try {
            const result = await addProjectAPI(reqbody,reqHeader)
            console.log(result);
            if (result.status==200) {
              handleClose()
              toast.success("Project added successfully")
            } else {
              toast.warning(result.response.data)
            }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.warning("Please fill the form completely..")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'><i className="fa-solid fa-plus"></i> Add Projects</button>

      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className='col-lg-4'>
              <label>
                <input type="file" style={{display:"none"}} onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})}/>
                <img height={"200px"} className='img-fluid w-100' src={preview} alt="" />
              </label>
              {!imageFileStatus &&
                <div className="text-warning fw-semibold my-2">Upload only following file types(jpeg,jpg,png)</div>
              }
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" className='form-control' placeholder='Project Title'/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})}  type="text" className='form-control' placeholder='Language used in project'/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" className='form-control' placeholder='Project GITHUB Link'/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" className='form-control' placeholder='Project website Link'/>
              </div>
            </div>
          </div>
          <div>
            <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className='form-control' placeholder='Project Overview'/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleAdd}>ADD</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default Add
