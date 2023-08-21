const { Thought } = require('../models')

const thoughtsController = {
  getThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((err) => res.status(400).json(err))
  },
  createThought(req, res) {
    try {
      const { username, thoughtText } = req.body

      const payload = {
        username: username,
        thoughtText: thoughtText,
      }

      Thought.create(payload).then((thought) => {
        res.status(200).json({
          success: true,
          data: thought,
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
