const { User, Thought } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const userData = await User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        .select('-__v');
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        .select('-__v');
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      // Remove user's associated thoughts
      await Thought.deleteMany({ username: userData.username });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = userController;