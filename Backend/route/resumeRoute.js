const { createResume, updateResume, getAllResumes, getResumeById, getResumesByUser, deleteResume, uploadResumeImages } = require('../controller/resumeController');
const upload = require('../utils/upload')
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router()

router.post('/createresume',protect ,createResume)
router.put('/updateresume/:resumeId',protect ,updateResume)
router.post('/uploadresumeimages/:resumeId',upload.fields([{name: "profilePic"}, {name: "thumbnailPic"}]), uploadResumeImages)
router.get('/getallresumes', protect, getAllResumes)
router.get('/getresumebyid/:resumeId',protect ,getResumeById);
router.get('/getresumebyuser', protect, getResumesByUser);
router.delete('/deleteresume/:resumeId', protect, deleteResume)



module.exports = router;