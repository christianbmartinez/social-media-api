const { Thought, User } = require('../models')

const thoughtsController = {
  // Get all thoughts
  getThoughts(req, res) {
    try {
      Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then((thoughts) => {
          if (!thoughts.length) {
            res.status(404).json({ message: 'No thoughts found!' })
          } else {
            res.status(200).json({
              success: true,
              data: thoughts,
            })
          }
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
  // Get a thought by id
  getThoughtById(req, res) {
    try {
      const { id } = req.params
      Thought.find({ _id: id }).then((thought) => {
        if (!thought) {
          res.status(404).json({
            success: false,
            message: 'No thought found with that id!',
          })
        } else {
          res.status(200).json({ success: true, data: thought })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while finding the thought!',
      })
    }
  },
  // Update a thought by id
  updateThought(req, res) {
    try {
      const { thoughtText, username, thoughtId } = req.body
      Thought.findOneAndUpdate(
        { _id: thoughtId },
        { username: username, thoughtText: thoughtText },
        {
          new: true,
          runValidators: true,
        }
      ).then((thought) => {
        if (!thought) {
          res
            .status(404)
            .json({ success: false, message: 'No thought found with that id!' })
        } else {
          res.status(200).json({ success: true, data: thought })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while updating the thought!',
      })
    }
  },
  // Delete a thought by id
  deleteThought(req, res) {
    try {
      const { id } = req.params
      Thought.findOneAndDelete({ _id: id }).then((thought) => {
        if (!thought) {
          res.status(404).json({
            success: false,
            message: 'No thought found with that id!',
          })
        } else {
          res.status(200).json({ success: true, data: thought })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while deleting the thought!',
      })
    }
  },
  // Create a reaction
  createReaction(req, res) {
    try {
      const { id } = req.params
      const { username, reactionBody } = req.body
      const payload = {
        username: username,
        reactionBody: reactionBody,
      }
      Thought.findOneAndUpdate(
        { _id: id },
        { $push: { reactions: payload } },
        { new: true }
      ).then((thought) => {
        if (!thought) {
          res
            .status(404)
            .json({ success: false, message: 'No thought found with that id!' })
        } else {
          res.status(200).json({ success: true, data: thought })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while creating the reaction!',
      })
    }
  },
  // Delete a reaction
  deleteReaction(req, res) {
    try {
      const { id, reactionId } = req.params
      Thought.findOneAndUpdate(
        { _id: id },
        { $pull: { reactionId: reactionId } },
        { new: true }
      ).then((thought) => {
        if (!thought) {
          res
            .status(404)
            .json({ success: false, message: 'No thought found with that id!' })
        } else {
          res.status(200).json({ success: true, data: thought })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while deleting the reaction!',
      })
    }
  },
}

module.exports = thoughtsController
