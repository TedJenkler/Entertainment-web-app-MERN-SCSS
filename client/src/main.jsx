import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import { store } from './app/store'
import { Provider } from 'react-redux'
import './assets/styles/main.scss';
import Nav from './components/Nav.jsx';
import Movies from './components/Movies.jsx';
import Series from './components/Series.jsx';
import Bookmarks from './components/Bookmarks.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element:<><Nav /><App /></>
  },
  {
    path: "/movies",
    element:<><Nav /><Movies /></>
  },
  {
    path: "/series",
    element:<><Nav /><Series /></>
  },
  {
    path: "/bookmarks",
    element:<><Nav /><Bookmarks /></>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
