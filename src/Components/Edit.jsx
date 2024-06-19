import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import addImage from '../assets/addImage.png'
import SERVERURL from '../services/serverurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { editProjectAPI } from '../services/allAPI';
import { editResponseContext } from '../Contexts/ContextAPI';

function Edit({project}) {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const [projectDetails,setProjectDetails] = useState({
    id:project?._id,title:project?.title,language:project?.language,github:project?.github,website:project?.website,overview:project?.overview,projectImg:""
  })
  const [preview,setPreview] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () =>{
     setShow(false);
     setProjectDetails({id:project?._id,title:project?.title,language:project?.language,github:project?.github,website:project?.website,overview:project?.overview,projectImg:""})
    }
  const handleShow = () =>{
     setShow(true);
     setProjectDetails({id:project?._id,title:project?.title,language:project?.language,github:project?.github,website:project?.website,overview:project?.overview,projectImg:""})
  }

  const [imageFileStatus,setImageFileStatus] = useState(true)


  useEffect(()=>{
    if (projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg") {
      setPreview(URL.createObjectURL(projectDetails.projectImg))
      setImageFileStatus(true)
    } else {
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({...projectDetails,projectImg:""})
    }
  },[projectDetails.projectImg])

  const handleUpdateProject = async () =>{
    const {id,title,language,github,website,overview,projectImg} = projectDetails
    if (title && language && github && website && overview) {
      // api call proceed
      // reqbody
      const reqbody = new FormData
      reqbody.append("title",title)
      reqbody.append("language",language)
      reqbody.append("github",github)
      reqbody.append("website",website)
      reqbody.append("overview",overview)
      preview ? reqbody.append("projectImg",projectImg) : reqbody.append("projectImg",project.projectImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // api call
        try {
          const result = await editProjectAPI(id,reqbody,reqHeader)
          console.log(result);
          if (result.status==200) {
            handleClose()
            // pass response to view
            setEditResponse(result)
          }else{
            console.log(result.response);
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
      <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>

      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className='col-lg-4'>
              <label>
                <input type="file" style={{display:"none"}} onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})}/>
                <img height={"200px"} className='img-fluid w-100' src={preview ? preview : `${SERVERURL}/Uploads/${project?.projectImg}`} alt="" />
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
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default Edit
