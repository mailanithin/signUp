import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Dashboard() {

  let userDetails =useSelector((store)=>{
     return store.userDetails
  })
   
  return (
    <div className="App">
      <h1>Dashboard</h1>
      <h1>{userDetails.firstName}{userDetails.lastName}</h1>
      <h1>{`/${userDetails.profilePic}`}</h1>
      <Link to='/'>login</Link>
    </div>
  )
}

export default Dashboard
