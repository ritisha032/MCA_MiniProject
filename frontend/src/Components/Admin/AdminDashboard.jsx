import React from 'react'
import './style.css'
import Navbar from './Navbar/Navbar'
import Comp from './Component/Comp'
import Output from './Output/Output'

const AdminDashboard = () => {
  return (
    <>
        <p> Hello everyone</p>
        <div className='Nav-bar'>
            <Navbar/>
        </div> 
        <div className="Component-body">
            <div className="component">
                <Comp/>
            </div>
            <div className="Out-put-box">
                <Output/>
            </div>    
        </div> 
    </>
  )
}

export default AdminDashboard
