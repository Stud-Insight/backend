import handleProfilePictureUpload from "@/controllers/attachments/singleUploadController";
import verifyAuth from "@/middlewares/verifyAuth";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload');
router.post("/profilepicture", upload.single('image'), verifyAuth, handleProfilePictureUpload);
router.delete("/profilepicture");
router.get(":userId/:documentId");
router.delete(":userId/:fileId");

module.exports = router;