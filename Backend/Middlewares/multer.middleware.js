const multer = require("multer");
const path = require("path");
const fs = require("fs");
const os = require("os");

// Define the upload directory
const uploadDirectory = path.join(__dirname, "..", "Public/temp");
console.log(`Upload Directory: ${uploadDirectory}`);
console.log(`File Permissions: ${fs.statSync(uploadDirectory).mode}`);
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
// const uploadDirectory = path.join(os.tmpdir(), "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });
module.exports = upload;
