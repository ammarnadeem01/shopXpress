const streamifier = require("streamifier");
const multer = require("multer");
const cloudinary = require("../Utils/cloudinary");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("File buffer is missing."));
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = { upload, uploadToCloudinary };
