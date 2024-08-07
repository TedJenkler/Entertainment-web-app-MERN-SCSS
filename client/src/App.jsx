import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./components/Carousel";
import { getTrendingMovies } from "./features/movies/movieSlice";
import { getTrendingSeries } from "./features/series/serieSlice";

function App() {
  const trendingmovies = useSelector((state) => state.movies.trending);
  const trendingseries = useSelector((state) => state.series.trending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTrendingSeries());
  }, [dispatch]);

  return (
    <main>
      <Carousel h1="Trending Movies" data={trendingmovies} />
      <Carousel h1="Trending Series" data={trendingseries} />
    </main>
  );
}

export default App;