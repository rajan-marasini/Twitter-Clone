import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createPost = asyncHandler(async (req, res) => {
    try {
        const { user } = req;

        const { body, image } = req.body;

        const post = await prisma.post.create({
            data: {
                body,
                image,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        return res.status(201).send({
            success: true,
            message: "Posted Successfully",
            post,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const allPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: true,
                comments: true,
            },
        });

        res.status(200).send({ posts });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const likePost = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;

        const post = await prisma.post.findUnique({ where: { id } });
        const alreadyLiked = post.likedIds.includes(user.id);

        if (alreadyLiked) {
            await prisma.post.update({
                where: { id },
                data: {
                    likedIds: {
                        set: post.likedIds.filter(
                            (userId) => userId != user.id
                        ),
                    },
                },
            });
            return res.status(200).send({
                success: true,
                message: "Removed like",
            });
        } else {
            await prisma.post.update({
                where: { id },
                data: {
                    likedIds: {
                        push: user.id,
                    },
                },
            });

            return res.status(200).send({
                success: true,
                message: "Liked",
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
};
