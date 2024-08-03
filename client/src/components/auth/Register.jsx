import React from 'react'
import icon from '../../assets/images/Movie.png';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='bgauth'>
      <img src={icon} alt='icon' />
      <div className='register'>
        <h1>Sign Up</h1>
        <input placeholder='Email address'></input>
        <input placeholder='Password'></input>
        <input className='lastinput' placeholder='Repeat Password'></input>
        <button>Create an account</button>
        <div>
          <p>Alread have an account?</p>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
