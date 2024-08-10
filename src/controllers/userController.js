const axios = require('axios');
const User = require('../models/userModel');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// TMDB

const options = {
    getToken: {
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
        const response = await axios(url, options.getToken);
        const token = response.data.request_token;

        res.status(200).json({ message: 'Successfully fetched token', token });
    } catch (error) {
        logger.error('Couldn\'t get token from TMDB', { error: error.message });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.tmdbLogin = async (req, res, next) => {
    const { username, password, request_token } = req.body;
    const url = 'https://api.themoviedb.org/3/authentication/token/validate_with_login';

    const postAction = {
      ...options.postAction,
      data: {
        username,
        password,
        request_token
      }
    };

    try {
        const response = await axios(url, postAction);
        const session = response.data;
        
        res.status(200).json({ message: 'Successfully logged in', session });
    } catch (error) {
        logger.error('Couldn\'t login to TMDB', { error: error.message });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/*   Not currently working

exports.tmdblogout = async (req, res, next) => {
    const { session_id } = req.body;
    const url = 'https://api.themoviedb.org/3/authentication/session';
    
    console.log('TMDB Logout initiated...');
    console.log('Request Body:', req.body);
    console.log('Session ID:', session_id);
  
    try {
      const response = await axios({
        url,
        ...options.deleteAction,
        data: { session_id }
      });
      
      const result = response.data;
      console.log('TMDB Logout successful');
      console.log('Response Data:', result);
  
      res.status(200).json({ message: 'Successfully logged out', result });
    } catch (error) {
      console.error('Error logging out:', error.message);
      if (error.response) {
          console.error('Error Details:', error.response.data);
      } else {
          console.error('No response data');
      }
      
      logger.error('Couldn\'t logout of TMDB', { error: error.message });
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };  */

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

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({
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