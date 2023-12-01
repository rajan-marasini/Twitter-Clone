import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaConfig.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

export const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const userExist = await prisma.user.findUnique({ where: { email } });

        if (!userExist) {
            const sameUsername = await prisma.user.findUnique({
                where: { username },
            });

            if (!sameUsername) {
                const hashedPassword = await hashPassword(password);

                const user = await prisma.user.create({
                    data: {
                        name,
                        username,
                        email,
                        password: hashedPassword,
                    },
                });

                res.status(201).send({
                    success: true,
                    message: "Successfully registered",
                    user,
                });
            } else {
                return res.status(200).send({
                    success: false,
                    message: "Username already taken",
                });
            }

            const hashedPassword = await hashPassword(password);
        } else {
            res.status(200).send({
                success: false,
                message: "Email is taken",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({ where: { username } });

        if (user) {
            const passwordMatch = await comparePassword(
                password,
                user.password
            );

            if (passwordMatch) {
                const token = await jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );

                delete user.password;

                return res
                    .status(200)
                    .cookie("token", token, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                    })
                    .send({
                        success: true,
                        message: "Login successful",
                        user,
                    });
            } else {
                return res.status(200).send({
                    success: false,
                    message: "Invalid credentials",
                });
            }
        } else {
            res.status(200).send({
                success: false,
                message: "User doesn't exist",
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const getOneUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({ where: { id } });

        res.send({ user });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const getProfile = asyncHandler(async (req, res) => {
    try {
        const { user } = req;

        res.status(200).send({ user });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const userLogout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "").send({
            user: {},
            success: true,
            message: "Successfully logged out",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const { id } = req.user;

        const allUsers = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                NOT: {
                    id,
                },
            },
        });

        res.send({ allUsers });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "Something went wrong",
            success: false,
            error: error.message,
        });
    }
});

export const followUser = asyncHandler(async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;

        const isFollowing = user.followingIds.includes(id);

        if (isFollowing) {
            //if already following unfollow the user
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    followingIds: {
                        set: user.followingIds.filter((userId) => userId != id),
                    },
                },
            });
            await prisma.user.update({
                where: { id },
                data: {
                    followersIds: {
                        set: user.followingIds.filter((userId) => userId != id),
                    },
                },
            });

            res.send({
                success: true,
                message: "Unfollowed successfully",
                user,
            });

            //if not following follow the user
        } else {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    followingIds: {
                        push: id,
                    },
                },
            });

            await prisma.user.update({
                where: { id },
                data: {
                    followersIds: {
                        push: user.id,
                    },
                },
            });

            res.send({
                success: true,
                message: "Followed Successfully",
                user,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});
