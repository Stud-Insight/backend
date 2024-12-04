import express from "express";
import mailController from "@controllers/mailerController";
import { text } from "stream/consumers";

const router = express.Router();

router.post('/mailer', mailController.trySendMail);

export default router;