import { Router } from "express";
import providerController from "../controller/Providers.js";

const router = Router();
router.post('/add', providerController.createProvider);
router.post('/get', providerController.getProvider);
router.post('/remove', providerController.delProvider);
router.post('/update', providerController.editProvider);

export default router;