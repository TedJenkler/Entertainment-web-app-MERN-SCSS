const axios = require('axios');
const logger = require('../utils/logger');

exports.toprated = async (req, res, next) => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWRiM2UzN2IwZTkxNzg1MzA0MDUwOTc5MjEyMzQxYSIsIm5iZiI6MTcyMjcwNjAzNC44MDg5NzUsInN1YiI6IjY2YWU1ZThhN2I0NjExNzc1OTM5Y2MxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gp2hUhy8VKHoaZVz7bh4Inkc8ECFYJuRpse4plPzHaE'
  };

  try {
    const response = await axios.get(url, { headers });
    const movies = response.data.results;
    if (movies.length === 0) {
      logger.info('No top-rated movies found');
      return res.status(404).json({ message: 'No top-rated movies found' });
    }

    res.status(200).json({ message: 'Successfully fetched top-rated movies', movies });
  } catch (error) {
    logger.error('Could not fetch top-rated movies', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};