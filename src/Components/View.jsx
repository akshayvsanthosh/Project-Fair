import React, { useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userProjectAPI } from '../services/allAPI'
import Projects from '../Pages/Projects'


function View() {
  const [userProjects, setUserProjects] = useState([])
  // console.log(userProjects);

  useEffect(() => {
    getUserProjects()
  }, [])

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      // api call
      try {
        const result = await userProjectAPI(reqHeader)
        // console.log(result);
        if (result.status == 200) {
          setUserProjects(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between mt-2'>
        <h2 className='text-warning'>All Projects</h2>
        <div>
          <Add />
        </div>
      </div>
      <div className="mt-2">
        {userProjects?.length > 0 ?
          userProjects?.map(project => (
            <div key={project?._id} className='border rounded p-2 d-flex justify-content-between mb-3'>
              <h3>{project?.title}</h3>
              <div className='d-flex align-items-center'>
                <div>
                  <Edit />
                </div>
                <div className='btn'><a href={project?.github} target='_blank'><i className="fa-brands fa-github"></i></a></div>
                <button className='btn text-danger'><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          ))
          :
          <div className='fw-bolder text-warning'>No Project Uploaded</div>
        }
      </div>
    </>
  )
}

export default View
