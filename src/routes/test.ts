import express from "express";
import testController from "@controllers/testController";

const router = express.Router();

router.get('/test', testController.handleTest);

export default router;