import express from "express";
import testController from "@controllers/mailerController";

const router = express.Router();

router.get('/test', testController.envoyerMail);

export default router;