const router = require('express').Router()
/* /api/thoughts */
router.route('/').get(getThoughts).post(createThought)

module.exports = router
