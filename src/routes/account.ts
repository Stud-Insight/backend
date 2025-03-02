import accountController from "@/controllers/account/accountController";
import express from "express";

const router = express.Router();

router.post('/', accountController.handleUserCreation);

module.exports = router;