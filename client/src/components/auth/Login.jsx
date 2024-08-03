import React from 'react';
import icon from '../../assets/images/Movie.png';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='bgauth'>
        <img src={icon} alt='icon' />
        <div className='login'>
            <h1>Login</h1>
            <input placeholder='Email address'></input>
            <input placeholder='Password'></input>
            <button>Login to your account</button>
            <div>
                <p>Don’t have an account?</p>
                <Link to="/register">Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default Login
