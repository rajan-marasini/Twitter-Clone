import express from "express";
import {
    allPosts,
    createPost,
    likePost,
} from "../controller/postController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/create", isSignedIn, createPost);
router.get("/allPosts", allPosts);
router.post("/likeapost/:id", isSignedIn, likePost);

export { router as postRoute };
