const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})

exports.upload = multer({
  storage,
  fieldSize: '2MB',
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/png' || file.mimetype !== 'image/jpg') {
      return cb(new Error('Only JPG, JPEG, or PNG are allowed'))
    }
    cb(null, true)
  }
})
