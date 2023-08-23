const router = require('express').Router()
const {
  getThoughts,
  createThought,
  getThoughtById,
} = require('../../controllers/thoughts-controller')
/* /api/thoughts */
router.route('/').get(getThoughts).post(createThought)
/* /api/thoughts/:id */
router.route('/:id').get(getThoughtById)

module.exports = router
