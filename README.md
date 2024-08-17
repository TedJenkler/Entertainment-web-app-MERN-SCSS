# Frontend Mentor - Entertainment Web App Solution

This is a personal project inspired by the [Entertainment web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X), where the goal is to take the challenge to the next level by integrating it with The Movie Database (TMDB) API for a more dynamic and data-driven application. Frontend Mentor challenges help you improve your coding skills by building realistic projects, and this project aims to enhance those skills even further with additional features and a more complex backend.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
- [Frontend](#frontend)
  - [Built With](#frontend-built-with)
- [Backend](#backend)
  - [Built With](#backend-built-with)
- [My Process](#my-process)
- [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages.
- Add/Remove bookmarks from all movies and TV series.
- Search for relevant shows on all pages.
- **Extra**: Build this project as a full-stack application using the TMDB API.
- **Extra**: Implement an authentication flow with sign-up/login functionality, inspired by the original challenge but enhanced with real-world data from TMDB.
- **Extra**: Create a secure authentication system that allows users to use their TMDB account data to sign up and log in. The system securely saves the link to their TMDB profile in your database, ensuring user data is handled safely and efficiently.

## Frontend

### Built With

- [React](https://react.dev/) - A JavaScript library for building user interfaces.
- [React DOM](https://react.dev/reference/react-dom) - Provides DOM-specific methods that can be used at the top level of your app.
- [React Redux](https://react-redux.js.org/) - Official React bindings for Redux.
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development.
- [React Router DOM](https://reactrouter.com/en/main) - Declarative routing for React.js.
- [Sass](https://sass-lang.com/) - CSS preprocessor for more manageable and maintainable stylesheets.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js.

## Backend

### Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime for server-side development.
- [Express.js](https://expressjs.com/) - Web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Library for hashing passwords.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - Rate limiting middleware.
- [express-validator](https://express-validator.github.io/docs/) - Validation middleware for Express.
- [Winston](https://github.com/winstonjs/winston) - Logging library for Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management.
- [helmet](https://helmetjs.github.io/) - Security middleware for HTTP headers.
- [cors](https://www.npmjs.com/package/cors) - Middleware to enable CORS.
- [nodemon](https://www.npmjs.com/package/nodemon) - Utility to automatically restart the server.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for creating and verifying JSON Web Tokens (JWTs).

## My Process

1. **Initial Setup**
   - Set up the project environment and created initial documentation.

2. **Account Functionality**
   - Developed user account logic, including sign-up and login processes.
   - Integrated TMDB API for user authentication and data retrieval.

3. **Core Features**
   - Integrated TMDB API for fetching movies and series.
   - Implemented a carousel for different categories of data and series.
   - Added search, pagination, bookmark, and favorites functionality.
   - Added rating functionality for movies and series.

4. **Refactor UI and Code Logic**
   - Refactored UI for improved responsiveness and design consistency.
   - Refined code logic for better performance and maintainability.

## Useful Resources

### Frontend

- [React Documentation](https://reactjs.org/docs/getting-started.html) - Comprehensive guide for using React, including hooks and context.
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) - Official documentation for Redux Toolkit, including best practices and usage examples.
- [React Router Documentation](https://reactrouter.com/docs/en/v6) - Guide for using React Router for declarative routing in React applications.
- [Sass Documentation](https://sass-lang.com/documentation) - Official guide for using Sass, including variables, mixins, and nesting.
- [Axios Documentation](https://axios-http.com/docs/intro) - Documentation for Axios, including how to perform HTTP requests and handle responses.

### Backend

- [Express.js Documentation](https://expressjs.com/) - Comprehensive guide for using Express, including routing, middleware, and API creation.
- [Mongoose Documentation](https://mongoosejs.com/docs/) - Guide for MongoDB object modeling with Mongoose, including schema definitions and querying.
- [Winston Documentation](https://github.com/winstonjs/winston) - Documentation on setting up logging with Winston, including different logging transports and levels.
- [Helmet Documentation](https://helmetjs.github.io/) - Guide for enhancing HTTP security headers using Helmet.
- [CORS Documentation](https://www.npmjs.com/package/cors) - Middleware for handling Cross-Origin Resource Sharing (CORS) in Express applications.
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt) - Guide for hashing passwords with bcrypt, including API usage and examples.
- [dotenv Documentation](https://www.npmjs.com/package/dotenv) - Documentation for managing environment variables with dotenv.
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken) - Guide for creating and verifying JWTs for secure authentication.
- [Nodemon Documentation](https://www.npmjs.com/package/nodemon) - Tool for automatically restarting the server during development.
- [Express-Rate-Limit Documentation](https://www.npmjs.com/package/express-rate-limit) - Documentation on rate limiting to protect APIs from abuse.
- [Express-Validator Documentation](https://express-validator.github.io/docs/) - Guide for validating and sanitizing user input.

## Author

- Frontend Mentor - [@TedJenkler](https://www.frontendmentor.io/profile/TedJenkler)
- LinkedIn - [Teodor Jenkler](https://www.linkedin.com/in/tedjenklerwebdeveloper/)
- X - [@TJenkler](https://x.com/TJenkler)
- Discord - [TedJenkler](https://discord.com/users/TedJenkler)

## Acknowledgments

*(Provide any acknowledgments here if necessary.)*
