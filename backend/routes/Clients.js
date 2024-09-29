import { Router } from "express";
import userController from "../controller/Clients.js";

const router = Router();
router.post('/add', userController.createClient);
router.post('/get', userController.getClient);
router.post('/remove', userController.delClient);
router.post('/update', userController.editClient);

export default router;