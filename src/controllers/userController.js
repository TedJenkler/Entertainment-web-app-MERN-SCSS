const User = require('../models/userModel');
const logger = require('../utils/logger');

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

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        };

        const newUser = new User({
            email,
            password
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: savedUser });
    }catch (error) {
        logger.error('Could not register user', { error });
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