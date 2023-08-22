const router = require('express').Router()
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
} = require('../../controllers/users-controller')
/* /api/users */
router.route('/').get(getUsers).post(createUser)
/* /api/users/:id */
router.route('/:id').get(getUserById).put(updateUser)

module.exports = router
