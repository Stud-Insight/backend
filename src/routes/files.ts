import uploadProfilePictureController from "@/controllers/files/uploadProfilePictureController";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('image'), uploadProfilePictureController.uploadProfilePicture);

export default router;