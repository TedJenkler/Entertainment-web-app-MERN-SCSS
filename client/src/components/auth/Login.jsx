import React from 'react';
import icon from '../../assets/images/Movie.png';

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
                <a>Sign Up</a>
            </div>
        </div>
    </div>
  )
}

export default Login
