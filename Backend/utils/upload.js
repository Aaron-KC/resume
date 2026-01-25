const multer = require('multer');
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dstn = 'uploads/'
    if(!fs.existsSync(dstn)) {
      fs.mkdirSync(dstn, {recursive: true})
    }
    cb(null, dstn)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + (ext.includes(".") ? ext : ext + '.png'))
  }
})

function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  const acceptingExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']

  // To reject this file pass `false`, like so:
  if(acceptingExtensions.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('File extension not accepted!'))
  }
  // To accept the file pass `true`, like so:

  // You can always pass an error if something goes wrong:

}

const upload = multer({ storage: storage, fileFilter })

module.exports = upload