import express from 'express';
import auth from './auth.routes.js';
import upload from '../middlewares/lib/upload.js';
import multer from 'multer';

const router = express.Router();

// Routes for /api are added here 
router.use(auth);

router.post("/upload", function (req, res) { 
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) 
            throw new APIError("Resim Yüklenirken Multer Kaynaklı Hata Çıktı : ", err)
        else if (err) 
            throw new APIError("Resim Yüklenirken Hata Çıktı : ", err)
        else return new Response(req.savedImages, "Yükleme Başarılı").success(res)
    })
})


export default router;