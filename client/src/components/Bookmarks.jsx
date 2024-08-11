import React, { useEffect } from 'react';
import Carousel from './Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getSeries } from '../features/bookmark/bookmarkSlice';

function Bookmarks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getSeries());
  }, [dispatch]);

  const movies = useSelector((state) => state.bookmarks.watchlistMovies);
  const series = useSelector((state) => state.bookmarks.watchlistSeries);

  return (
    <main>
      {movies.length > 0 && <Carousel h1="Bookmarked Movies" data={movies} />}
      {series.length > 0 && <Carousel h1="Bookmarked Series" data={series} />}
    </main>
  );
}

export default Bookmarks;