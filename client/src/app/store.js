import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import movieSlice from "../features/movies/movieSlice";

export const store = configureStore({
    reducer: {
        auth: userSlice,
        movies: movieSlice
    },
});