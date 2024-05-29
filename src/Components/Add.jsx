import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import addImage from '../assets/addImage.png'

function Add() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <input type="file" style={{display:"none"}}/>
                <img height={"200px"} className='img-fluid w-100' src={addImage} alt="" />
              </label>
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Project Title'/>
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Language used in project'/>
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Project GITHUB Link'/>
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Project website Link'/>
              </div>
            </div>
          </div>
          <div>
            <input type="text" className='form-control' placeholder='Project Overview'/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary">ADD</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
