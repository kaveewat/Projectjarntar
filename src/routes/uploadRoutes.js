const express = require('express');
const upload = require('../middleware/upload');
const UploadController = require('../controllers/uploadController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/upload/image - Upload an image (require auth)
router.post('/image', authenticateToken, upload.single('image'), UploadController.uploadImage);

// DELETE /api/upload/image/:filename - Delete an image (require auth)
router.delete('/image/:filename', authenticateToken, UploadController.deleteImage);

module.exports = router;
