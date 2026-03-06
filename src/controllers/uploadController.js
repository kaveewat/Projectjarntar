const fs = require('fs');
const path = require('path');

class UploadController {
  // POST /api/upload/image
  static async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        const error = new Error('ไม่พบไฟล์ที่ต้องการอัปโหลด');
        error.statusCode = 400;
        throw error;
      }

      // Generate the URL for the uploaded file
      const fileUrl = `/uploads/${req.file.filename}`;

      res.status(201).json({
        success: true,
        message: 'อัปโหลดรูปภาพสำเร็จ',
        data: {
          filename: req.file.filename,
          url: fileUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      // Clean up file if upload failed
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('ข้อผิดพลาดในการลบไฟล์:', err);
        });
      }
      next(error);
    }
  }

  // DELETE /api/upload/image/:filename
  static async deleteImage(req, res, next) {
    try {
      const { filename } = req.params;

      // Validate filename to prevent path traversal
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        const error = new Error('ชื่อไฟล์ไม่ถูกต้อง');
        error.statusCode = 400;
        throw error;
      }

      const filePath = path.join(__dirname, '../../uploads', filename);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        const error = new Error('ไม่พบไฟล์');
        error.statusCode = 404;
        throw error;
      }

      // Delete the file
      fs.unlinkSync(filePath);

      res.json({
        success: true,
        message: 'ลบรูปภาพสำเร็จ',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UploadController;
