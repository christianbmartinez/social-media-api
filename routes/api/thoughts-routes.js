const router = require('express').Router()
const {
  getThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughts-controller')
/* /api/thoughts */
router.route('/').get(getThoughts).post(createThought)
/* /api/thoughts/:id */
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)
/* /api/thoughts/:id/reactions */
router.route('/:id/reactions').post(createReaction)
/* /api/thoughts/:id/reactions/:reactionId */
router.route('/:id/reactions/:reactionId').delete(deleteReaction)

module.exports = router
