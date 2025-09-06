const multer = require('multer');
const path = require('path');
const fs = require('fs');


const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);


const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, UPLOAD_DIR),
filename: (req, file, cb) => {
const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
cb(null, unique + path.extname(file.originalname));
}
});


const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
module.exports = upload;