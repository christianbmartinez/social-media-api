const { User } = require('../models')

const usersController = {
  // Get all users
  getUsers(req, res) {
    try {
      User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then((users) => {
          res.status(200).json({
            success: true,
            data: users,
          })
        })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while fetching users!',
      })
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const { username, email } = req.body
      const payload = {
        username: username,
        email: email,
      }
      const userExists = await User.findOne({
        username: username,
        email: email,
      })
      if (userExists) {
        res.status(409).json({
          success: false,
          message: 'User already exists in our database!',
        })
      } else {
        User.create(payload).then((user) => {
          res.status(200).json({
            success: true,
            data: user,
          })
        })
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while creating the user!',
      })
    }
  },
  // Get a user by id
  getUserById(req, res) {
    try {
      const { id } = req.params
      User.findOne({ _id: id })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        .then((user) => {
          if (!user) {
            res
              .status(404)
              .json({ success: false, message: 'No user found with that id!' })
          } else {
            res.status(200).json({ success: true, data: user })
          }
        })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while finding the user!',
      })
    }
  },
  // Update a users username and email by id
  updateUser(req, res) {
    try {
      const { id } = req.params
      const { username, email } = req.body
      User.findOneAndUpdate(
        { _id: id },
        { username: username, email: email },
        {
          new: true,
          runValidators: true,
        }
      ).then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ success: false, message: 'No user found with that id!' })
        } else {
          res.status(200).json({ success: true, data: user })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while updating the user!',
      })
    }
  },
  // Delete a user by id
  deleteUser(req, res) {
    try {
      const { id } = req.params
      User.findOneAndDelete({ _id: id }).then((user) => {
        if (!user) {
          res.status(404).json({
            success: false,
            message: 'No user found with that id!',
          })
        } else {
          res.status(200).json({ success: true, data: user })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while deleting the user!',
      })
    }
  },
  // Add a friend by id
  addFriend(req, res) {
    try {
      const { id, friendId } = req.params
      User.findOneAndUpdate(
        { _id: id },
        { $push: { friends: friendId } },
        { new: true }
      ).then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ success: false, message: 'No user found with that id!' })
        } else {
          res.status(200).json({ success: true, data: user })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while adding a friend!',
      })
    }
  },
  // Delete a friend by id
  deleteFriend(req, res) {
    try {
      const { id, friendId } = req.params
      User.findOneAndUpdate(
        { _id: id },
        { $pull: { friends: friendId } },
        { new: true }
      ).then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ success: false, message: 'No user found with that id!' })
        } else {
          res.status(200).json({ success: true, data: user })
        }
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while deleting a friend!',
      })
    }
  },
}

module.exports = usersController
