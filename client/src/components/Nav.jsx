import React from 'react'
import logo from "../assets/images/Movie.png"
import home from "../assets/images/home.png"
import series from "../assets/images/series.png"
import bookmark from "../assets/images/Bookmark.png"
import movie from "../assets/images/movie.png"
import oval from "../assets/images/Oval.png"
import selectedMovie from "../assets/images/selectedmovie.png"
import selectedseries from "../assets/images/selectedseries.png"
import selectedbookmark from "../assets/images/selectedbookmark.png"
import { Link, useLocation } from 'react-router-dom'

function Nav() {
  const params = useLocation();
  return (
    <nav>
        <div>
          <img className='logo' src={logo} alt='logo' />
          <div>
            { /* <img src={home} alt='home' /> */}
            <Link to="/movies"><img src={params.pathname === "/movies" ? selectedMovie : movie} alt='movies' /></Link>
            <Link to="/series"><img src={params.pathname === "/series" ? selectedseries : series} alt='tv shows' /></Link>
            <Link to="/bookmarks"><img src={params.pathname === "/bookmarks" ? selectedbookmark : bookmark} alt='saved' /></Link>
          </div>
        </div>
        <img className='profile' src={oval} alt='profile' />
    </nav>
  )
}

export default Nav