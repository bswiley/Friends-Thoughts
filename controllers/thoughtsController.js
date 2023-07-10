const { User, Thought } = require('../models');

const thoughtsController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughtData = await Thought.find({}).select('-__v');
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const thoughtData = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: 'Thought and associated user data deleted!' });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtsController;