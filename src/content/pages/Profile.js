import React from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  // If there is not a user, send them away
  if (!props.user) {
    return <Redirect to="/" />
  }
  
  return (
    <div>
      <h2>Profile STUB</h2>
    </div>
  )
}

export default Profile
