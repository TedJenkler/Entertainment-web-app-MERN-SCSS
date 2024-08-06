import React from 'react'
import AiringToday from './AiringToday'
import OnAir from './OnAir'
import PopularShows from './PopularShows'
import TopRatedShows from './TopRatedShows'

function Series() {
  return (
    <main>
      <OnAir />
      <AiringToday />
      <PopularShows />
      <TopRatedShows />
    </main>
  )
}

export default Series
