import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import movieSlice from "../features/movies/movieSlice";
import serieSlice from "../features/series/serieSlice";
import stateSlice from "../features/state/stateSlice";

export const store = configureStore({
    reducer: {
        auth: userSlice,
        movies: movieSlice,
        series: serieSlice,
        state: stateSlice
    },
});