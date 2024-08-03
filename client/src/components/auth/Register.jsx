import React, { useState } from 'react';
import icon from '../../assets/images/Movie.png';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [formError, setFormError] = useState({ email: "", password: "", confirmPassword: "" });

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
      case 'confirmPassword':
        if (value.trim() === "") {
          return "Can’t be empty";
        }
        if (value !== formData.password) {
          return "Passwords do not match";
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
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);

    setFormError({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    return !emailError && !passwordError && !confirmPasswordError;
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
      <form className='register' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
            placeholder='Password'
            autoComplete='new-password'
          />
          {formError.password && <span>{formError.password}</span>}
        </label>
        <label>
          <input
            onChange={handleChange}
            value={formData.confirmPassword}
            type='password'
            name='confirmPassword'
            className='lastinput'
            placeholder='Repeat Password'
            autoComplete='new-password'
          />
          {formError.confirmPassword && <span>{formError.confirmPassword}</span>}
        </label>
        <button type='submit'>Create an account</button>
        <div>
          <p>Already have an account?</p>
          <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;