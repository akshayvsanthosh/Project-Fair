import React from 'react'
import Header from '../Components/Header'
import View from '../Components/View'
import Profile from '../Components/Profile'

const Dashboard = () => {
  return (
    <div>
      <Header insideDashboard={true}/>
      <div style={{marginTop:"100px"}} className='container-fluid'>
        <div className="row mt-3">
          <div className="col-lg-8">
            <h1>Welcome <span className='text-warning'>User</span>,</h1>
            <View/>
          </div>
          <div className="col-lg-4">
            <Profile/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
