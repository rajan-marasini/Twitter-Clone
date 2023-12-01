import express from "express";
import { createComment } from "../controller/commentController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/create/:postId", isSignedIn, createComment);

export { router as commentRoute };
