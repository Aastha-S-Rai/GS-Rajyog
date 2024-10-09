import { Router } from "express";
import providerController from "../controller/Providers.js";
import mapController from "../controller/Map.js"

const router = Router();
router.post('/add', providerController.createProvider);
router.post('/get-providers', providerController.getMultipleProvider);
router.post('/get-single-provider', providerController.getSingleProvider);
router.post('/remove', providerController.delProvider);
router.post('/update', providerController.editProvider);
router.post('/update-service', mapController.editMap);
router.post('/delete-service', mapController.delMap);

export default router;