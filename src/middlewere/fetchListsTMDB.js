const axios = require('axios');
const logger = require('../utils/logger');
const List = require('../models/listModel');
const User = require('../models/userModel');
require('dotenv').config();

const getAction = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const fetchListTMDB = async (req, res, next) => {
    const { account_id } = req.query;
    const getLists = `https://api.themoviedb.org/3/account/${account_id}/lists?page=1`;

    try {
        const response = await axios(getLists, getAction);
        const lists = response.data.results;

        req.lists = [];

        const user = await User.findOne({ account_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        for (const listData of lists) {
            const { id, name, description, favorite_count, item_count, iso_639_1, poster_path } = listData;

            try {
                let list = await List.findOne({ id });

                if (list) {
                    list.name = name;
                    list.description = description;
                    list.favorite_count = favorite_count;
                    list.item_count = item_count;
                    list.iso_639_1 = iso_639_1;
                    list.poster_path = poster_path;
                    await list.save();
                    logger.info(`List ${name} has been updated.`);
                } else {
                    list = new List({
                        id,
                        name,
                        description,
                        favorite_count,
                        item_count,
                        iso_639_1,
                        poster_path,
                        user: user._id
                    });
                    await list.save();
                    logger.info(`New list ${name} has been added.`);
                }

                if (!user.lists.includes(list._id)) {
                    user.lists.push(list._id);
                }

                req.lists.push(list);
            } catch (dbError) {
                logger.error(`Couldn't save list ${name}: ${dbError.message}`);
            }
        }

        await user.save();

        next();
    } catch (error) {
        logger.error('Could not sync list data', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = fetchListTMDB;