const cloudinary = require("../../Config/cloudinaryConfig");

class CloudinaryUploadService {
  async upload(file, filename) {
    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "airline_docs",
        public_id: filename,
        use_filename: true,
        unique_filename: false,
      });
      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error("File upload failed");
    }
  }
}

module.exports = CloudinaryUploadService;
