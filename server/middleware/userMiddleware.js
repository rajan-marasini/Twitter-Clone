import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaConfig.js";

export const isSignedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.send({ message: "You need to login" });
        } else {
            const { id } = await jwt.verify(token, process.env.JWT_SECRET);

            const user = await prisma.user.findUnique({ where: { id } });

            delete user.password;

            req.user = user;

            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
