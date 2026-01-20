const { createResume, getAllResumes, getResumeById, getResumesByUser, deleteResume, uploadResumeImages } = require('../controller/resumeController');
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router()

router.post('/createresume',protect ,createResume)
router.get('/getallresumes', protect, getAllResumes)
router.get('/getresumebyid/:resumeId',protect ,getResumeById);
router.get('/getresumebyuser', protect, getResumesByUser);



module.exports = router;