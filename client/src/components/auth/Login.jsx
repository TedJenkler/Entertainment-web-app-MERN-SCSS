import React, { useState } from 'react';
import icon from '../../assets/images/Movie.png';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (value.trim() === "") {
          return "Can’t be empty";
        }
        return "";
      case 'password':
        if (value.trim() === "") {
          return "Can’t be empty";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormError((prevError) => ({
      ...prevError,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    setFormError({
      email: emailError,
      password: passwordError
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data is valid:", formData);
    }
  };

  return (
    <div className='bgauth'>
      <img src={icon} alt='icon' />
      <form className='login' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          <input
            onChange={handleChange}
            value={formData.email}
            type='text'
            name='email'
            placeholder='Email address'
            autoComplete='email'
          />
          {formError.email && <span>{formError.email}</span>}
        </label>
        <label>
          <input
            onChange={handleChange}
            value={formData.password}
            type='password'
            name='password'
            className='lastinput'
            placeholder='Password'
            autoComplete='current-password'
          />
          {formError.password && <span>{formError.password}</span>}
        </label>
        <button type='submit'>Login to your account</button>
        <div>
          <p>Don’t have an account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
