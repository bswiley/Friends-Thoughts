const { User } = require('../models');

const friendsController = {
  addFriend: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = friendsController;