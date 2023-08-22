const router = require('express').Router()
const {
  getUsers,
  createUser,
  getUserById,
} = require('../../controllers/users-controller')
/* /api/users */
router.route('/').get(getUsers).post(createUser)
/* /api/users/:id */
router.route('/:id').get(getUserById)

module.exports = router
