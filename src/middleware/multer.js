const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // กำหนดโฟลเดอร์ที่ไฟล์จะถูกเก็บ
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
module.exports = upload;