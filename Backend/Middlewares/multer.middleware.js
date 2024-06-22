const multer =require("multer");
const path =require("path");
const fs =require("fs");

// Define the upload directory
const uploadDirectory = path.join(__dirname, '..', 'Public/temp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory)
    },
    filename:  function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  
  
const upload = multer({ storage });
module.exports=upload;
