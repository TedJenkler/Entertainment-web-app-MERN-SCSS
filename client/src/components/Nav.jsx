import React, { useEffect } from 'react'
import logo from "../assets/images/Movie.png"
import home from "../assets/images/home.png"
import series from "../assets/images/series.png"
import bookmark from "../assets/images/Bookmark.png"
import movie from "../assets/images/movie.png"
import oval from "../assets/images/Oval.png"
import logout from "../assets/images/logout.png"
import selectedhome  from "../assets/images/selectedhome.png"
import selectedMovie from "../assets/images/selectedmovie.png"
import selectedseries from "../assets/images/selectedseries.png"
import selectedbookmark from "../assets/images/selectedbookmark.png"
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUsername } from '../features/users/userSlice'

function Nav() {
  
  const params = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const avatarPath = user ? user.avatar_path : null
  const imageUrl = `https://image.tmdb.org/t/p/w200${avatarPath}`;

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(getUserByUsername({ username: user }))
    }
  }, [dispatch]);

  const handleLogout = () => {

  };

  return (
    <nav>
        <div>
          <img className='logo' src={logo} alt='logo' />
          <div>
            <Link to="/"><img src={params.pathname === "/home" ? selectedhome : home} alt='home' /></Link>
            <Link to="/movies"><img src={params.pathname === "/movies" ? selectedMovie : movie} alt='movies' /></Link>
            <Link to="/series"><img src={params.pathname === "/series" ? selectedseries : series} alt='tv shows' /></Link>
            <Link to="/bookmarks"><img src={params.pathname === "/bookmarks" ? selectedbookmark : bookmark} alt='saved' /></Link>
          </div>
        </div>
        <div className='user_container'>
          <img className='profile' src={user ? imageUrl : oval} alt='profile' />
          <img onClick={handleLogout} className='logout_login' src={logout} alt='logout/login' />
        </div>
    </nav>
  )
}

export default Nav