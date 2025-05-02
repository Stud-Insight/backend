import accountController from "@/controllers/account/accountController";
import express from "express";

const router = express.Router();

router.get('/', accountController.getAllUsers);
router.post('/', accountController.handleUserCreation);

module.exports = router;