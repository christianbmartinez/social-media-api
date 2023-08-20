const router = require('express').Router()

router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

module.exports = router
