import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import movieSlice from "../features/movies/movieSlice";
import serieSlice from "../features/series/serieSlice";
import stateSlice from "../features/state/stateSlice";
import bookmarkSlice from "../features/bookmark/bookmarkSlice";
import favoriteSlice from "../features/favorite/favoriteSlice";
import listslice from "../features/list/listslice";

export const store = configureStore({
    reducer: {
        auth: userSlice,
        movies: movieSlice,
        series: serieSlice,
        state: stateSlice,
        bookmarks: bookmarkSlice,
        favorites: favoriteSlice,
        list: listslice
    },
});