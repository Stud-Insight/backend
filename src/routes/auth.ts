import handleActivation from "@/controllers/auth/activateController";
import handleLogin from "@/controllers/auth/loginController";
import handleLogout from "@/controllers/auth/logoutController";
import handleRefresh from "@/controllers/auth/refreshController";
import express from "express";

const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.post('/refresh', handleRefresh);
router.post('/activate/:token', handleActivation);

module.exports = router;