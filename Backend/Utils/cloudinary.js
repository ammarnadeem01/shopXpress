const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlink(localFilePath, (err) => {
      // console.log(err);
    });
    return response;
  } catch (error) {
    fs.unlink(localFilePath, (err) => {
      // console.log(err);
    });
    return null;
  }
};

module.exports = uploadOnCloudinary;
