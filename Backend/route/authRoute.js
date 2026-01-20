const { register, login, getUser } = require('../controller/authController')
const { protect } = require('../middleware/authMiddleware')

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.get('/getuser', protect, getUser)

module.exports = router