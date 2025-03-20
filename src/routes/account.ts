import accountController from "@/controllers/account/accountController";
import express from "express";

const router = express.Router();

router.post('/', accountController.createUser);
router.get('/', accountController.getUsers);
router.get('/:id', accountController.getUserById);
router.put('/:id', accountController.updateUser);
router.delete('/:id', accountController.deleteUser);

module.exports = router;