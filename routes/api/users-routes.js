const router = require('express').Router()
/* /api/users */
router.route('/').get(getUsers).post(createUser)

module.exports = router
