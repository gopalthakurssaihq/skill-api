  const multer = require("multer");
  const path = require("path");
  const fs = require("fs");

  // Function to ensure the upload directory exists
  const ensureUploadsDirectory = (uploadPath) => {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory recursively
    }
  };

  // Function to create a dynamic multer instance
  const createMulterInstance = (uploadPath = "src/public/uploads/", allowedTypes = []) => {
    // Ensure the upload directory exists
    ensureUploadsDirectory(uploadPath);

    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        // Use the provided upload path
        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        // Extract file extension
        const ext = path.extname(file.originalname);

        // Remove spaces from the base name and replace them with hyphens
        const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");

        // Create a unique filename with a timestamp
        const newFileName = `${baseName}-${Date.now()}${ext}`;

        // Pass the new filename to multer
        callback(null, newFileName);
      },
    });

    // File filter for allowed types
    const fileFilter = (req, file, callback) => {
      if (allowedTypes.length === 0) {
        // No restrictions on file types
        callback(null, true);
      } else if (allowedTypes.includes(file.mimetype)) {
        // Allow only specified file types
        callback(null, true);
      } else {
        callback(new Error(`File type not allowed: ${file.mimetype}`));
      }
    };

    // Configure multer with dynamic storage and file filter
    return multer({
      storage,
      fileFilter,
      limits: {
        fileSize: 2 * 1024 * 1024 * 1024, // 2GB max file size
        fields: 10, // Max number of fields
        fieldSize: 1 * 1024 * 1024, // Max size for each field value (1MB)
      },
    });
  };

  module.exports = { createMulterInstance };
