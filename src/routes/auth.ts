import handleLogin from "@/controllers/auth/loginController";
import handleRefresh from "@/controllers/auth/refreshController";
import hasRoles from "@/middlewares/hasRoles";
import verifyAuth from "@/middlewares/verifyAuth";
import express from "express";

import { Request, Response } from 'express';

const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout', verifyAuth, hasRoles("ADMIN"), (Request: Request, res: Response) => { res.status(200).send("Utilisateur a les rôles pour !!!!"); });
router.post('/refresh', handleRefresh);
router.get('/activate/:id');

module.exports = router;