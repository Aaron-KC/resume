const { register, login, getUser, updateProfilePicture, verifyEmail, resendVerification, sendPasswordResetCode, verifyPasswordResetCode, resetPasswordFinal } = require('../controller/authController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../utils/upload')

const router = require('express').Router()

router.post('/register',upload.single('image') ,register)
router.post('/login', login)
router.get('/getuser', protect, getUser)
router.post('/uploadprofilepic', protect, upload.single('image'), updateProfilePicture)
router.get('/verifyemail', verifyEmail)
router.post('/resendverificationemail', resendVerification)
router.post('/sendotp', sendPasswordResetCode)
router.post("/verifyotp", verifyPasswordResetCode);
router.post("/resetpassword", resetPasswordFinal)

module.exports = router