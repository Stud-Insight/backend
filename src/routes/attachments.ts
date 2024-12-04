import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('image'));
router.post("/profilepicture");
router.delete("/profilepicture");
router.get(":userId/:documentId");
router.delete(":userId/:fileId");

module.exports = router;