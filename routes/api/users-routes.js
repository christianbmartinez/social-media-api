const router = require('express').Router()
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/users-controller')
/* /api/users */
router.route('/').get(getUsers).post(createUser)
/* /api/users/:id */
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)
/* /api/users/:id/friends/:friendId */
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)
module.exports = router
