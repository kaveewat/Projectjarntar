const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { loginValidator, registerValidator, handleValidationErrors } = require('../middleware/validators');

const router = express.Router();

// POST /api/auth/register - สมัครสมาชิก (เฉพาะ admin เท่านั้น)
router.post(
  '/register',
  authenticateToken,
  authorizeRoles('admin'),
  registerValidator,
  handleValidationErrors,
  AuthController.register
);

// POST /api/auth/login - เข้าสู่ระบบ
router.post(
  '/login',
  loginValidator,
  handleValidationErrors,
  AuthController.login
);

// GET /api/auth/profile - ข้อมูลผู้ใช้ปัจจุบัน
router.get('/profile', authenticateToken, AuthController.getProfile);

// PUT /api/auth/change-password - เปลี่ยนรหัสผ่าน
router.put(
  '/change-password',
  authenticateToken,
  [
    (req, res, next) => {
      // Custom validation for change-password
      const errors = [];
      if (!req.body.currentPassword) errors.push({ field: 'currentPassword', message: 'กรุณาระบุรหัสผ่านปัจจุบัน' });
      if (!req.body.newPassword) errors.push({ field: 'newPassword', message: 'กรุณาระบุรหัสผ่านใหม่' });
      if (req.body.newPassword && req.body.newPassword.length < 4) errors.push({ field: 'newPassword', message: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 4 ตัวอักษร' });
      
      if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'ข้อมูลไม่ถูกต้อง', errors });
      }
      next();
    },
  ],
  AuthController.changePassword
);

module.exports = router;
