import AttachmentsController from "@/controllers/AttachmentsController";
import verifyAuth from "@/middlewares/verifyAuth";
import express from "express";
import multer from "multer";

const attController = new AttachmentsController();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), verifyAuth, attController.upload);
router.post("/avatar", upload.single('image'), verifyAuth, attController.changeAvatar);
router.get("/:fileId", verifyAuth, attController.download);
router.delete("/:fileId", verifyAuth, attController.delete);

module.exports = router;