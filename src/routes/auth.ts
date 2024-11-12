import handleLogin from "@/controllers/auth/loginController";
import express from "express";

const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout');
router.post('/refresh');
router.get('/activate/:id');

export default router;