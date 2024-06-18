import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landing from '../assets/landing.png'
import ProjectCards from '../Components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [homeproject, setHomeProject] = useState([])
  const navigate = useNavigate()

  // console.log(homeproject);
  useEffect(() => {
    getHomeProject()
  }, [])

  const getHomeProject = async () => {
    try {
      const result = await homeProjectAPI()
      // console.log(result);
      if (result.status == 200) {
        setHomeProject(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleProject =()=>{
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    } else {
      toast.warning("Please login to get full access to our projects!!")
    }
  }

  return (
    <>
      <div style={{ minHeight: "100vh" }} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{ fontSize: "80px" }}><i className="fa-brands fa-hubspot"></i> Project Fair</h1>
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus iste reiciendis, nobis odio autem optio, soluta molestias quas qui sint ex possimus laborum amet ad consequuntur neque cum eveniet libero!
              </p>
              {sessionStorage.getItem("token") ?
                <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                :
                <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
              }
            </div>
            <div className='col-lg-6'>
              <img width={"100%"} className='img-fluid' src={landing} alt="Landing" />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 text-center'>
        <h1 className='mb-5'>Explore Our Projects</h1>
        <marquee>
          <div className='d-flex'>
            {homeproject?.length > 0 &&
              homeproject?.map(project => (
                <div key={project?._id} className='me-5'>
                  <ProjectCards displayData={project}/>
                </div>
              ))
            }
          </div>
        </marquee>
        <button onClick={handleProject} className='btn btn-link mt-3' >CLICK HERE TO VIEW MORE PROJECTS...</button>
      </div>

      <div className='d-flex align-items-center mt-5 flex-column'>
        <h1>Our Testimonials</h1>
        <div className='d-flex align-items-center justify-content-evenly mt-3 w-100'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img className='rounded-circle img-fluid' width={"60px"} height={"60px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8BxnJvfe-jW3MSctMfM3mkkVk5RbhE4Khfg&s" alt="image" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>

                </div>
                <p>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img className='rounded-circle img-fluid' width={"60px"} height={"60px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl4pO2rWHeSEqWwAotcGJZ58ibTKjes1CpHg&s" alt="image" />
                <span>Emy Sai</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>

                </div>
                <p>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img className='rounded-circle img-fluid' width={"60px"} height={"60px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfLcPyhPXJZFMKDmMCmADeTlMUrw29NgNsKQ&s" alt="image" />
                <span>John</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>
                  <div className='fa-solid fa-star text-warning'></div>

                </div>
                <p>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Home
