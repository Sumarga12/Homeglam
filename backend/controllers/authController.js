// controllers/authController.js
const jwt       = require('jsonwebtoken');
const crypto    = require('crypto');
const User      = require('../models/User');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../utils/sendEmail');

const generateToken = (id) => {
  console.log('Generating token for user ID:', id);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @desc Signup
// @route POST /api/auth/signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required.' });

  if (await User.findOne({ email }))
    return res.status(400).json({ error: 'Email already registered.' });

  const user  = await User.create({ name, email, password });
  const token = generateToken(user._id);

  // Send welcome email
  try {
    await sendWelcomeEmail(user.email, user.name);
    console.log('Welcome email sent to:', user.email);
  } catch (emailError) {
    console.error('Failed to send welcome email:', emailError);
    // Don't fail the signup if email fails
  }

  res.status(201).json({
    user:  { id: user._id, name: user.name, email: user.email },
    token,
  });
};

// @desc Login
// @route POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ error: 'Invalid email or password.' });

  const token = generateToken(user._id);
  res.json({
    user:  { id: user._id, name: user.name, email: user.email },
    token,
  });
};

// @desc Change password
// @route POST /api/auth/change-password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.matchPassword(currentPassword)))
    return res.status(401).json({ error: 'Current password is incorrect.' });

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password changed successfully.' });
};

// @desc Request password reset
// @route POST /api/auth/request-password-reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.json({ message: 'If that email is registered, you\'ll receive a reset link.' });

  const resetToken = user.getResetPasswordToken();
  await user.save();

  // For HashRouter, we need to use #/reset-password/token format
  const resetUrl = `${process.env.FRONTEND_URL}/#/reset-password/${resetToken}`;

  try {
    await sendPasswordResetEmail(user.email, resetUrl, user.name);
    console.log('Password reset email sent to:', user.email);
    console.log('Reset URL:', resetUrl);
    res.json({ message: 'Reset link sent (check your email).' });
  } catch (err) {
    console.error('Password reset email error:', err);
    user.resetPasswordToken   = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(500).json({ error: 'Email could not be sent. Please try again later.' });
  }
};

// @desc Reset password via token
// @route PUT /api/auth/reset-password/:token
exports.resetPassword = async (req, res) => {
  const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken:   hashed,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ error: 'Invalid or expired reset token.' });

  user.password             = req.body.password;
  user.resetPasswordToken   = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Your password has been updated.' });
};

// @desc Update user profile
// @route PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user.id);

  if (!user)
    return res.status(404).json({ error: 'User not found.' });

  // Check if email is being changed and if it's already taken
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: 'Email already in use.' });
  }

  user.name = name;
  user.email = email;

  await user.save();

  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    message: 'Profile updated successfully.'
  });
};
