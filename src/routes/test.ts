import express from "express";
import testController from "@controllers/mailerController";

const router = express.Router();

router.post('/test', testController.envoyerMail);

export default router;