import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  // Declare and initialize state
  let [serverMessage, setServerMessage] = useState('')
  let [dogState, setDogState] = useState([])

  const getDogs = () => {
    let token = localStorage.getItem('userToken')

    fetch(`${process.env.REACT_APP_SERVER_URL}/dogs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json().then(result => {
        if (response.ok) {
          setDogState(result.dogs)
        }
        else {
          console.log('Darn', result)
          setServerMessage('No DOGS for youuuuuu!')
        }
      })
      .catch(err => {
        console.log('Error parsing JSON')
      })
    })
    .catch(err => {
      console.log('Some sort of error', err)
    })
  }

  const callServer = () => {
    let token = localStorage.getItem('userToken')

    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json().then(result => {
        if (response.ok) {
          setServerMessage(result.message)
        }
        else {
          setServerMessage('No secret message for youuuuuu!')
        }
      })
      .catch(err => {
        console.log('Error parsing JSON')
      })
    })
    .catch(err => {
      console.log('Some sort of error', err)
    })
  }

  // If there is not a user, send them away
  if (!props.user) {
    return <Redirect to="/" />
  }

  let dogs = dogState.map((d, i) => {
    return (
      <div key={i}>
        <h2>{d.name}</h2>
        <p>{d.name} is a {d.breed} owned by {d.owner}</p>
      </div>
    )
  })

  return (
    <div>
      <h2>{props.user.firstname}'s Profile</h2>
      <h3>{props.user.firstname} {props.user.lastname}</h3>
      <img alt="profile" src={props.user.profileUrl} />
      <p>
        <strong>Email:</strong>
        {props.user.email}
      </p>
      <button onClick={callServer}>Call /profile route on server</button>
      <p>{serverMessage}</p>
      <button onClick={getDogs}>Show User's Dogs</button>
      {dogs}
    </div>
  )
}

export default Profile
