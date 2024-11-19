import express from "express";
import testController from "@controllers/mailerController";

const router = express.Router();

router.post('/mailerTest', testController.envoyerMail);

export default router;