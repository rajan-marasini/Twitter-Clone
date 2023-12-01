import express from "express";
import {
    createUser,
    followUser,
    getAllUsers,
    getOneUser,
    getProfile,
    loginUser,
    userLogout,
} from "../controller/userController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/follow/:id", isSignedIn, followUser);
router.get("/allUser", isSignedIn, getAllUsers);
router.get("/profile", isSignedIn, getProfile);
router.post("/logout", isSignedIn, userLogout);
router.get("/:id", getOneUser);

export { router as userRoute };
