const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const { mongo } = require('mongoose');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    if(err instanceof mongo.MongoError) {
      res.status(400).json({
        status: 'error',
        data: {
          error: err,
        }
      })
    }
  }
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.body.records && req.body.records.length) {
    const nameOfGame = req.body.records[0].game;
    const score = req.body.records[0].score;
    const recordId = req.body.records[0].recordId;
    const index = user.records.findIndex(record => record._id.toString() === recordId);
    if (index !== -1) {
      user.records[index] = { ...user.records[index], game: nameOfGame, score };
    } else {
      user.records.push(req.body.records[0]);
    }
    user.name = user.name === req.body.name ? user.name : req.body.name;
    const updatedUser = await user.save();
    return res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (updatedUser) {
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'user not found',
    });
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.body && !!req.body.recordId) {
    return next()
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteRecord = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user.records.length > 1) {
    user.records = user.records.filter(record => record._id.toString() !== req.body.recordId)
    await user.save()
    return res.status(204).json({
        status: 'success',
        data: null,
      });
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});