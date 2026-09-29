const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already registered'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (!user) {
      return res.status(400).json({
        message: 'User registration failed'
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const message = `Welcome to Shuooks ${name}. Thank you for joining us.

Your OTP for registration is ${otp}`;

    try {
      await sendEmail(
        email,
        'Welcome to Shuooks - Your OTP',
        message
      );
    } catch (emailError) {
      console.log('Email error:', emailError.message);
    }

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.log('Register error:', error);

    return res.status(500).json({
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password'
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: 'Invalid email or password'
      });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.log('Login error:', error);

    return res.status(500).json({
      message: error.message
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password');

    return res.status(200).json(users);

  } catch (error) {
    console.log('Get users error:', error);

    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers
};