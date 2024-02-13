import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer Configuration for File Upload
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "images/jpg",
    "image/gif",
    "image/jpeg",
    "image/png",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(
      new Error(
        "Bu Resim Tipi Desteklenmemektedir. Lütfen Farklı Bir Resim Seçiniz !"
      ),
      false
    );
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = __dirname;

    fs.mkdirSync(path.join(rootDir, "/public/uploads"), { recursive: true });
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];

    if (!req.savedImages) req.savedImages = [];

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    let url = `image_${uniqueSuffix}.${extension}`;

    req.savedImages = [...req.savedImages, path.join(url)];

    cb(null, url);
  },
});

const upload = multer({ storage, fileFilter }).array("images");
export default upload;
