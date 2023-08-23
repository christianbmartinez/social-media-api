const { Thought, User } = require('../models')

const thoughtsController = {
  // Get all thoughts
  getThoughts(req, res) {
    try {
      Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then((thoughts) => {
          res.status(200).json({
            success: true,
            data: thoughts,
          })
        })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while fetching thoughts!',
      })
    }
  },
  // Create a thought
  createThought(req, res) {
    try {
      const { username, thoughtText, userId } = req.body
      const payload = {
        username: username,
        thoughtText: thoughtText,
      }
      Thought.create(payload).then(async (thought) => {
        return await User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        ).then((user) => {
          if (!user) {
            res.status(404).json({ message: 'No user found with that userId!' })
          } else {
            res.status(200).json({ success: true, data: user })
          }
        })
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while creating the thought!',
      })
    }
  },
}

module.exports = thoughtsController
