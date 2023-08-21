const { User } = require('../models')

const usersController = {
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
    } catch (error) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while fetching users!',
      })
    }
  },
  createUser(req, res) {
    try {
      const { username, email } = req.body

      const payload = {
        username: username,
        email: email,
      }

      User.create(payload).then((user) => {
        res.status(200).json({
          success: true,
          data: user,
        })
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err ? err : 'Something went wrong while creating the user!',
      })
    }
  },
}

module.exports = usersController
