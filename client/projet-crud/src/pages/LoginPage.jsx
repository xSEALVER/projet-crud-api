import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <>
      <Link to={`/signup`} className='btn btn-primary'>aller au signup</Link>
      <Link to={`/signin`} className='btn btn-primary'>aller au signin</Link>
    </>
    

  )
}

export default LoginPage