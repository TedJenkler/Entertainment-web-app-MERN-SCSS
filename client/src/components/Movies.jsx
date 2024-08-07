import React, { useEffect } from 'react';
import Carousel from './Carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getTopRated, getNowPlaying, getPopular, getUpcoming } from '../features/movies/movieSlice';
import Search from './Search';
import DisplaySearchResults from './DisplaySearchResults';

function Movies() {
  const toprated = useSelector((state) => state.movies.topRated);
  const nowplaying = useSelector((state) => state.movies.nowPlaying);
  const popular = useSelector((state) => state.movies.popular);
  const upcoming = useSelector((state) => state.movies.upcoming);
  const searchResults = useSelector((state) => state.state.searchResults);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopRated());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNowPlaying());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUpcoming());
  }, [dispatch]);

  return (
    <main>
      <Search />
      {searchResults.length > 0 ? (
        <DisplaySearchResults />
      ) : (
        <>
          <Carousel h1="Top Rated Movies" data={toprated} />
          <Carousel h1="Now Playing Movies" data={nowplaying} />
          <Carousel h1="Popular Movies" data={popular} />
          <Carousel h1="Upcoming Movies" data={upcoming} />
        </>
      )}
    </main>
  );
}

export default Movies;