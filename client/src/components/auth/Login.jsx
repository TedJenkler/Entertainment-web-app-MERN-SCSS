import React, { useEffect, useState } from 'react';
import icon from '../../assets/images/Movie.png';
import { Link } from 'react-router-dom';
import { login, loginTMDB } from '../../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });
  const [tmdbMode, setTmdbMode] = useState(false);

  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  console.log(error);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null && token !== '') {
      navigate("/home");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const session = localStorage.getItem('expires_at');
    if (session) {
      const sessionDate = new Date(session);
      const currentDate = new Date();
      if (currentDate < sessionDate) {
        navigate("/home");
      } else {
        console.log('Invalid session, try logging in again');
      }
    } else {
      console.log('Session not found, try logging in again');
    }
  }, [dispatch, navigate]);

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
      const { email, password } = formData;
      dispatch(login({ email, password }));
    }
  };

  const handleTMDB = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { email, password } = formData;
      dispatch(loginTMDB({ username: email, password }));
    }
  };

  const toggleMode = () => {
    setTmdbMode((prevMode) => !prevMode);
    setFormData({ email: "", password: "" });
    setFormError({ email: "", password: "" });
  };

  return (
    <div className='bgauth'>
      <img src={icon} alt='icon' />
      <form className='login'>
        <h1>Login</h1>
        <label>
          <input
            onChange={handleChange}
            value={formData.email}
            type='text'
            name='email'
            placeholder={tmdbMode ? 'TMDB Username' : 'Email address'}
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
        {!tmdbMode ? (
          <button onClick={handleSubmit}>Login to your account</button>
        ) : (
          <button onClick={handleTMDB}>Login to your TMDB account</button>
        )}
        <button type="button" onClick={toggleMode}>
          {tmdbMode ? 'Use this site email login' : 'Use TMDB login'}
        </button>
        <div>
          <p>Don’t have an account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
