import React from 'react'
import NowPlaying from "../components/NowPlaying"
import Popular from "../components/Popular"
import TopRated from "../components/TopRated"
import Upcoming from "../components/Upcoming"

function Movies() {
  return (
    <main>
        <TopRated />
        <NowPlaying />
        <Popular />
        <Upcoming />
    </main>
  )
}

export default Movies
