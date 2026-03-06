const { body, param, query, validationResult } = require('express-validator');

// =============================================
// Auth Validators
// =============================================
const loginValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('ชื่อผู้ใช้จำเป็น')
    .isLength({ min: 3, max: 100 })
    .withMessage('ชื่อผู้ใช้ต้องมี 3-100 ตัวอักษร'),
  body('password')
    .notEmpty()
    .withMessage('รหัสผ่านจำเป็น')
    .isLength({ min: 4 })
    .withMessage('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'),
];

const registerValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('ชื่อผู้ใช้จำเป็น')
    .isLength({ min: 3, max: 100 })
    .withMessage('ชื่อผู้ใช้ต้องมี 3-100 ตัวอักษร'),
  body('password')
    .notEmpty()
    .withMessage('รหัสผ่านจำเป็น')
    .isLength({ min: 4 })
    .withMessage('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'),
  body('role')
    .optional()
    .isIn(['student', 'advisor', 'admin'])
    .withMessage('บทบาทต้องเป็น student, advisor หรือ admin'),
];

// =============================================
// Student Validators
// =============================================
const createStudentValidator = [
  body('student_id')
    .trim()
    .notEmpty()
    .withMessage('รหัสนักศึกษาจำเป็น')
    .isLength({ min: 1, max: 20 })
    .withMessage('รหัสนักศึกษาต้องมี 1-20 ตัวอักษร'),
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('ชื่อจริงจำเป็น')
    .isLength({ min: 1, max: 100 })
    .withMessage('ชื่อจริงต้องมี 1-100 ตัวอักษร'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('นามสกุลจำเป็น')
    .isLength({ min: 1, max: 100 })
    .withMessage('นามสกุลต้องมี 1-100 ตัวอักษร'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('อีเมลจำเป็น')
    .isEmail()
    .withMessage('อีเมลต้องเป็นรูปแบบที่ถูกต้อง'),
  body('faculty')
    .trim()
    .notEmpty()
    .withMessage('คณะจำเป็น'),
  body('department')
    .trim()
    .notEmpty()
    .withMessage('สาขาวิชาจำเป็น'),
  body('year')
    .isInt({ min: 1, max: 4 })
    .withMessage('ปีการศึกษาต้องเป็น 1-4'),
];

// =============================================
// Alumni Validators
// =============================================
const createAlumniValidator = [
  body('alumni_id')
    .trim()
    .notEmpty()
    .withMessage('รหัสศิษย์เก่าจำเป็น'),
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('ชื่อจริงจำเป็น'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('นามสกุลจำเป็น'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('อีเมลต้องเป็นรูปแบบที่ถูกต้อง'),
  body('department')
    .trim()
    .notEmpty()
    .withMessage('สาขาวิชาจำเป็น'),
  body('graduation_year')
    .isInt({ min: 2000, max: new Date().getFullYear() })
    .withMessage('ปีสำเร็จการศึกษาต้องถูกต้อง'),
  body('employment_status')
    .optional()
    .isIn(['employed', 'seeking'])
    .withMessage('สถานะการจ้างงานต้องเป็น employed หรือ seeking'),
];

// =============================================
// Advisor Validators
// =============================================
const createAdvisorValidator = [
  body('advisor_id')
    .trim()
    .notEmpty()
    .withMessage('รหัสอาจารย์จำเป็น'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('ชื่ออาจารย์จำเป็น'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('อีเมลต้องเป็นรูปแบบที่ถูกต้อง'),
  body('faculty')
    .trim()
    .notEmpty()
    .withMessage('คณะจำเป็น'),
  body('department')
    .trim()
    .notEmpty()
    .withMessage('สาขาวิชาจำเป็น'),
];

// =============================================
// Project Validators
// =============================================
const createProjectValidator = [
  body('project_id')
    .trim()
    .notEmpty()
    .withMessage('รหัสโครงการจำเป็น'),
  body('title_th')
    .trim()
    .notEmpty()
    .withMessage('ชื่อโครงการ (ไทย) จำเป็น'),
  body('title_en')
    .trim()
    .notEmpty()
    .withMessage('ชื่อโครงการ (อังกฤษ) จำเป็น'),
  body('type')
    .isIn(['individual', 'group'])
    .withMessage('ประเภทโครงการต้องเป็น individual หรือ group'),
  body('year')
    .isInt({ min: 1, max: 4 })
    .withMessage('ปีโครงการต้องเป็น 1-4'),
];

// =============================================
// Common Validators
// =============================================
const paginationValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('หน้าต้องเป็นตัวเลขบวก'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('ขีดจำกัดต้องเป็น 1-100'),
];

const idValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID ต้องเป็นตัวเลขบวก'),
];

// =============================================
// Middleware
// =============================================
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'ข้อมูลไม่ถูกต้อง',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  loginValidator,
  registerValidator,
  createStudentValidator,
  createAlumniValidator,
  createAdvisorValidator,
  createProjectValidator,
  paginationValidator,
  idValidator,
  handleValidationErrors,
};
