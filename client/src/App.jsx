import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./components/Carousel";
import { getRating, getTrendingMovies } from "./features/movies/movieSlice";
import { getTrendingSeries } from "./features/series/serieSlice";
import Carousel2 from "./components/Carousel2";

function App() {
  const user = useSelector((state) => state.auth.user)
  const trendingmovies = useSelector((state) => state.movies.trending);
  const trendingseries = useSelector((state) => state.series.trending);
  const ratedMovies = useSelector((state) => state.movies.ratedMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (user && session) {
      dispatch(getRating({ session_id: session, account_id: user.tmdbid }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTrendingSeries());
  }, [dispatch]);

  return (
    <main>
      <Carousel2 h1="Trending Movies" data={trendingmovies} rated={ratedMovies} />
      <Carousel2 h1="Trending Series" data={trendingseries} />
    </main>
  );
}

export default App;