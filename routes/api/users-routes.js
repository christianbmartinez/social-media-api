const router = require('express').Router()
const { getUsers, createUser } = require('../../controllers/users-controller')
/* /api/users */
router.route('/').get(getUsers).post(createUser)

module.exports = router
