const axios = require('axios');
const User = require('../models/userModel');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// TMDB

const options = {
    getAction: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    },
    postAction: {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    },
    deleteAction: {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    }
};

exports.getToken = async (req, res, next) => {
    const url = 'https://api.themoviedb.org/3/authentication/token/new';
    
    try {
        const response = await axios(url, options.getAction);
        const token = response.data.request_token;

        res.status(200).json({ message: 'Successfully fetched token', token });
    } catch (error) {
        logger.error('Couldn\'t get token from TMDB', { error: error.message });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.tmdbLogin = async (req, res, next) => {
    const { username, password, request_token } = req.body;
    const validateURL = 'https://api.themoviedb.org/3/authentication/token/validate_with_login';
    const sessionURL = 'https://api.themoviedb.org/3/authentication/session/new';

    const validateAction = {
        ...options.postAction,
        data: {
            username,
            password,
            request_token
        }
    };

    try {
        const validateResponse = await axios(validateURL, validateAction);
        const validatedToken = validateResponse.data.request_token;

        const loginAction = {
            ...options.postAction,
            data: { request_token: validatedToken }
        };
        const sessionResponse = await axios(sessionURL, loginAction);
        const session = sessionResponse.data.session_id;

        const userDataURL = `https://api.themoviedb.org/3/account?session_id=${session}`;
        const fetchUserResponse = await axios.get(userDataURL, { headers: options.getAction.headers });
        const userData = fetchUserResponse.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOne({ username });
        if (user) {
            await User.updateOne({ username }, {
                $set: {
                    tmdbid: userData.id,
                    name: userData.name,
                    include_adult: userData.include_adult,
                    password: hashedPassword,
                    avatar_path: userData.avatar?.tmdb.avatar_path
                }
            });
            logger.info(`User ${username} has been updated.`);
        } else {
            const newUser = new User({
                username,
                password: hashedPassword,
                tmdbid: userData.id,
                name: userData.name,
                include_adult: userData.include_adult,
                avatar_path: userData.avatar?.tmdb.avatar_path
            });
            await newUser.save();
            logger.info(`New user ${username} has been added.`);
        }

        res.status(200).json({
            message: 'Successfully logged in',
            session: session,
            username: username
          });
    } catch (error) {
        logger.error(`Couldn't log in to TMDB: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.tmdblogout = async (req, res, next) => {
    const { session_id } = req.body;
    const url = 'https://api.themoviedb.org/3/authentication/session';

    try {
        const response = await axios({
            url,
            ...options.deleteAction,
            data: { session_id }
        });
        
        const result = response.data;
        res.status(200).json({ message: 'Successfully logged out', result });
    } catch (error) {
        if (error.response) {
            logger.error(`Error logging out: ${error.response.data}`, { error: error.message });
        } else {
            logger.error('Error logging out: No response data', { error: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            logger.info('No users found');
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({ message: 'Successfully fetched users', users });
    } catch (error) {
        logger.error('Could not fetch users', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getByUsername = async (req, res, next) => {
    try {
        const { username } = req.query;
        if (!username) {
            logger.info('Username not provided');
            return res.status(400).json({ message: 'Username is required' });
        }

        const user = await User.findOne({ username }, '-password');
        if (!user) {
            logger.info('Cannot find user', { username });
            return res.status(404).json({ message: 'Error finding user by username' });
        }

        res.status(200).json({ 
            message: 'Successfully found user by username', 
            user 
        });
    } catch (error) {
        logger.error('Could not fetch user', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, Email and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already in use' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        logger.error('Could not register', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error('Email and password are required');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            logger.error('Cannot find user with the provided email');
            return res.status(404).json({ message: 'Cannot find user' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.error('Invalid password');
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        logger.error('Could not login', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        const result = await User.updateOne(
            { _id: id },
            { $set: { email: email, password: password } }
        );
        
        if (result.matchedCount === 0) {
            logger.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        if (result.modifiedCount === 0) {
            logger.info('User data was already up to date');
            return res.status(200).json({ message: 'User data was already up to date' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        logger.error('Could not update user', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            logger.info('User not found or could not be deleted');
            return res.status(404).json({ message: 'User not found or could not be deleted' });
        }

        res.status(200).json({ message: 'Successfully deleted user' });
    } catch (error) {
        logger.error('Could not delete user', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};