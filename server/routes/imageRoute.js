import express from "express";
import multer from "multer";
import { uploadImage } from "../controller/imageController.js";

const router = express.Router();

const photoMiddleware = multer({
    storage: multer.memoryStorage(),
});

router.post("/upload", photoMiddleware.single("photo"), uploadImage);

export { router as imageRoute };
