import multer from "multer";
import fs from "fs"

var DIR = './public/';
/*if (!fs.existsSync(DIR)) {  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(DIR, { recursive: true });
}*/
 const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    
    callback(null, DIR);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, name);
  }
  
});

const uploadImg = multer({
  storage: storage
});
export default uploadImg;
