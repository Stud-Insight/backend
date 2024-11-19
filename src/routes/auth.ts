import handleLogin from "@/controllers/auth/loginController";
import handleRefresh from "@/controllers/auth/refreshController";
import express from "express";

const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout');
router.post('/refresh', handleRefresh);
router.get('/activate/:id');

module.exports = router;