import { Router } from "express";
import serviceController from "../controller/Services.js";

const router = Router();
router.post('/add', serviceController.createService);
router.post('/get', serviceController.getService);
router.post('/remove', serviceController.delService);
router.post('/update', serviceController.editService);

export default router;