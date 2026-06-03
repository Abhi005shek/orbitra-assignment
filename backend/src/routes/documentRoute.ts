import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";
import { uploadDocument } from "../controller/documentController";

const router = Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);

export default router;
