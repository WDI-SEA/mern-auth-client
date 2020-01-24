// Packages
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Update the message whenever something else is typed
  useEffect(() => {
    setMessage('')
  }, [email, password])

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    // Fetch call to POST data
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Success')
      response.json().then(result => {
        console.log('Response', response) // metadata, status, etc
        console.log('Result', result) // stuff in the send
        if (response.ok) {
          // Update the user's token (back up in App.js)
          props.updateUser(result.token)
        }
        else {
          setMessage(`${response.status} ${response.statusText}: ${result.message}`)
        }
      })
    })
    .catch(err => {
      console.log(err)
      setMessage(`${err.toString()}`)
    })
  }

  // If the user exists, redirect to the profile page
  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login
