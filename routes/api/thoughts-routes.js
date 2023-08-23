const router = require('express').Router()
const {
  getThoughts,
  createThought,
  getThoughtById,
  updateThought,
} = require('../../controllers/thoughts-controller')
/* /api/thoughts */
router.route('/').get(getThoughts).post(createThought)
/* /api/thoughts/:id */
router.route('/:id').get(getThoughtById).put(updateThought)

module.exports = router
