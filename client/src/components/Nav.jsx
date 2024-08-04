import React from 'react'
import logo from "../assets/images/Movie.png"
import home from "../assets/images/home.png"
import tv from "../assets/images/tv.png"
import bookmark from "../assets/images/Bookmark.png"
import movie from "../assets/images/movie.png"
import oval from "../assets/images/Oval.png"

function Nav() {
  return (
    <nav>
        <img className='logo' src={logo} alt='logo' />
        <div>
            <img src={home} alt='home' />
            <img src={movie} alt='movies' />
            <img src={tv} alt='tv shows' />
            <img src={bookmark} alt='saved' />
        </div>
        <img className='profile' src={oval} alt='profile' />
    </nav>
  )
}

export default Nav
