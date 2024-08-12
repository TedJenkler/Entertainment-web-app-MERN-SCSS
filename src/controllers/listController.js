const axios = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

const postAction = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const getAction = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const deleteAction = {
    method: 'DELETE',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const isInList = async ({ movie_id, listid }) => {
    const url = `https://api.themoviedb.org/3/list/${listid}/item_status?language=en-US&movie_id=${movie_id}`;
    try {
        const response = await axios({
            url,
            ...getAction
        });
        return response.data;
    } catch (error) {
        logger.error('Failed to check if movie is in list', { error: error.toString(), stack: error.stack });
        throw new Error('Failed to check if movie is in list');
    }
};

exports.details = async (req, res, next) => {
    const { listid } = req.body;
    const url = `https://api.themoviedb.org/3/list/${listid}?language=en-US&page=1`;

    try {
        const response = await axios({
            url,
            ...getAction
        });

        res.status(200).json({ message: 'Details fetched successfully', data: response.data });
    } catch (error) {
        logger.error('Failed to fetch list details', { error: error.toString(), stack: error.stack });
        res.status(500).json({ message: 'Failed to fetch list details', error: error.message });
    }
};

exports.add = async (req, res, next) => {
    const { session_id, name, description, language } = req.body;
    const url = `https://api.themoviedb.org/3/list?session_id=${session_id}`;
    try {
        const response = await axios({
            url,
            ...postAction,
            data: {
                name,
                description,
                language
            }
        });
        res.status(201).json({ message: 'List created successfully', data: response.data });
    } catch (error) {
        logger.error('Failed to create list', { error: error.toString(), stack: error.stack });
        res.status(500).json({ message: 'Failed to create list', error: error.message });
    }
};

exports.movie = async (req, res, next) => {
    const { session_id, listid, media_id } = req.body;
    const url = `https://api.themoviedb.org/3/list/${listid}/add_item?session_id=${session_id}`;

    try {
        const checkResponse = await isInList({ movie_id: media_id, listid });
        if (checkResponse.item_present) {
            return res.status(409).json({ message: 'Movie already in the list' });
        }

        const response = await axios({
            url,
            ...postAction,
            data: {
                media_id
            }
        });
        res.status(200).json({ message: 'Movie added successfully', data: response.data });
    } catch (error) {
        logger.error('Failed to add movie to list', { error: error.toString(), stack: error.stack });
        res.status(500).json({ message: 'Failed to add movie to list', error: error.message });
    }
};

exports.clear = async (req, res, next) => {
    const { listid, session_id, confirm } = req.body;
    const url = `https://api.themoviedb.org/3/list/${listid}/clear?session_id=${session_id}&confirm=${confirm}`;

    try {
        const response = await axios({
            url,
            ...postAction
        });

        res.status(200).json({ message: 'List cleared successfully', data: response.data });
    } catch (error) {
        logger.error('Failed to clear list', { error: error.toString(), stack: error.stack });
        res.status(500).json({ message: 'Failed to clear list', error: error.message });
    }
};

exports.removemovie = async (req, res, next) => {
    const { session_id, listid, media_id } = req.body;
    const url = `https://api.themoviedb.org/3/list/${listid}/remove_item?session_id=${session_id}`;
    
    try {
        const response = await axios({
            url,
            ...postAction,
            data: {
                media_id
            }
        });

        res.status(200).json({ message: 'Movie removed successfully', data: response.data });
    } catch (error) {
        logger.error('Failed to remove movie from list', { error: error.toString(), stack: error.stack });
        res.status(500).json({ message: 'Failed to remove movie from list', error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    const { listid, session_id } = req.body;
    const url = `https://api.themoviedb.org/3/list/${listid}?session_id=${session_id}`;
    try {
        const response = await axios({
            url,
            ...deleteAction
        });

        res.status(200).json({ message: 'List deleted successfully', data: response.data });
    } catch (error) {
        logger.error('Failed to delete list', { error: error.toString(), stack: error.stack });
        res.status(500).json({ message: 'Failed to delete list', error: error.message });
    }
};