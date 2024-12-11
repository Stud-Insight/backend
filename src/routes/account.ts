import handleUserCreation from "@/controllers/account/createUserController";
import express from "express";

const router = express.Router();
console.log('aled')
router.post('/create-user', handleUserCreation);

module.exports = router;