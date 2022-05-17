const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (
      file.mimetype !== 'image/jpeg' ||
      file.mimetype !== 'image/png' ||
      file.mimetype !== 'image/jpg' ||
      file.originalname !== '.jpg' ||
      file.originalname !== '.jpeg' ||
      file.originalname !== '.png'
    ) {
      return cb(new Error('Only JPG, JPEG, or PNG are allowed'), true)
    }
  }
})

exports.upload = multer({
  storage,
  fieldSize: '2MB'
})
