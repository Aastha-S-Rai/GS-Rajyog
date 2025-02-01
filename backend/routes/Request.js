import { Router } from "express";
import requestController from "../controller/Request.js";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Folder where the file will be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); // Naming the uploaded file
    },
  });
  
  // Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.post('/add', requestController.createRequest);
router.post('/get', requestController.getRequest);
router.post('/remove', requestController.delRequest);
router.post('/update', requestController.editRequest);
router.post('/upload', upload.single('file'), requestController.uploadReport);

export default router;