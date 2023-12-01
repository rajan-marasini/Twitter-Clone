import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { commentRoute } from "./routes/commentRoute.js";
import { imageRoute } from "./routes/imageRoute.js";
import { postRoute } from "./routes/postRoute.js";
import { userRoute } from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/image", imageRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
