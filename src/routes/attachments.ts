import handleAvatarUpload from "@/controllers/attachments/singleUploadController";
import verifyAuth from "@/middlewares/verifyAuth";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload');
router.post("/avatar", upload.single('image'), verifyAuth, handleAvatarUpload);
router.delete("/avatar");
router.get(":userId/:documentId");
router.delete(":userId/:fileId");

module.exports = router;