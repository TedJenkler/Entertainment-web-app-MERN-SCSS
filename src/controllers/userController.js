const User = require('../models/userModel');

exports.getAll = async (req, res, next) => {

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