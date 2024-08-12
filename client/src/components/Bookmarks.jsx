import React, { useEffect } from 'react';
import Carousel from './Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getSeries } from '../features/bookmark/bookmarkSlice';
import { getFavoriteMovies, getFavoriteSeries } from '../features/favorite/favoriteSlice';

function Bookmark() {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.auth.user?.tmdbid);

  useEffect(() => {
    if (userid) {
      dispatch(getMovies(userid));
      dispatch(getSeries(userid));
      dispatch(getFavoriteMovies(userid));
      dispatch(getFavoriteSeries(userid));
    }
  }, [dispatch, userid]);

  const bookmarkMovies = useSelector((state) => state.bookmarks.watchlistMovies);
  const bookmarkSeries = useSelector((state) => state.bookmarks.watchlistSeries);
  const favoriteMovies = useSelector((state) => state.favorites.favoriteMovies);
  const favoriteSeries = useSelector((state) => state.favorites.favoriteSeries);

  return (
    <main>
      {bookmarkMovies.length > 0 && <Carousel h1="Bookmarked Movies" data={bookmarkMovies} />}
      {favoriteMovies.length > 0 && <Carousel h1="Favorite Movies" data={favoriteMovies} />}
      {bookmarkSeries.length > 0 && <Carousel h1="Bookmarked Series" data={bookmarkSeries} />}
      {favoriteSeries.length > 0 && <Carousel h1="Favorite Series" data={favoriteSeries} />}
    </main>
  );
}

export default Bookmark;