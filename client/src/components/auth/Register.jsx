import React, { useState } from 'react';
import icon from '../../assets/images/Movie.png';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [formError, setFormError] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const error = useSelector((state) => state.auth.error);

  console.log(error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (value.trim() === "") {
          return "Can’t be empty";
        }
        return "";
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
    const usernameError = validateField('username', formData.username);
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);

    setFormError({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    return !usernameError && !emailError && !passwordError && !confirmPasswordError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { username, email, password } = formData;
      dispatch(register({ username, email, password }));
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      navigate("/");
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
            value={formData.username}
            type='text'
            name='username'
            placeholder='Username'
            autoComplete='username'
          />
          {formError.username && <span>{formError.username}</span>}
        </label>
        <label>
          <input
            onChange={handleChange}
            value={formData.email}
            type='email'
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