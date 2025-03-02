import { handleActivation } from "@/controllers/auth/activateController";
import { handleCheckActivation } from "@/controllers/auth/activateController";
import handleForgot from "@/controllers/auth/forgotController";
import handleLogin from "@/controllers/auth/loginController";
import handleLogout from "@/controllers/auth/logoutController";
import handleRefresh from "@/controllers/auth/refreshController";
import handleReset from "@/controllers/auth/resetController";
import express from "express";

const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.post('/refresh', handleRefresh);
router.post('/activate/:token', handleActivation);
router.post('/activate/check/:token', handleCheckActivation);
router.post('/forgot', handleForgot);
router.post('/reset/:token', handleReset);

module.exports = router;