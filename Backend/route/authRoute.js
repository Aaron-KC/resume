const { register, login, getUser } = require('../controller/authController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../utils/upload')

const router = require('express').Router()

router.post('/register',upload.single('image') ,register)
router.post('/login', login)
router.get('/getuser', protect, getUser)

module.exports = router