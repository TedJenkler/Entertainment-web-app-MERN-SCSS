const axios = require('axios');
const logger = require('../utils/logger');
const List = require('../models/listModel');
require('dotenv').config();

const getAction = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
  }
};

const syncListItems = async (req, res, next) => {
  const lists = req.lists;

  if (!lists || !Array.isArray(lists)) {
    return res.status(400).json({ message: 'Invalid or missing lists parameter' });
  }

  try {
    const listData = [];

    for (const list of lists) {
      const url = `https://api.themoviedb.org/3/list/${list.id}?language=en-US&page=1`;
      const response = await axios.get(url, getAction);
      
      listData.push(response.data);

      await List.findByIdAndUpdate(list._id, { $push: { mediaid: { $each: response.data.items.map(item => item.id) } } });
    }

    next();
  } catch (error) {
    logger.error('Error syncing list items', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = syncListItems;