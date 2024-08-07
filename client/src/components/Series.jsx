import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from './Carousel';
import { getOnAir, getPopular, getTopRated, getAiringToday } from '../features/series/serieSlice';

function Series() {
  const dispatch = useDispatch();
  const onair = useSelector((state) => state.series.onAir);
  const airingtoday = useSelector((state) => state.series.airingToday);
  const popular = useSelector((state) => state.series.popular);
  const toprated = useSelector((state) => state.series.topRated);

  useEffect(() => {
    dispatch(getOnAir());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAiringToday());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTopRated());
  }, [dispatch]);

  return (
    <main>
      <Carousel h1="Live" data={onair} />
      <Carousel h1="Shows Airing Today" data={airingtoday} />
      <Carousel h1="Popular Shows" data={popular} />
      <Carousel h1="Top Rated Shows" data={toprated} />
    </main>
  );
}

export default Series;