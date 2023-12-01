import { prisma } from "../config/prismaConfig.js";

export const createComment = async (req, res) => {
    try {
        const { user } = req;

        const { body } = req.body;
        const { postId } = req.params;

        const comment = await prisma.comment.create({
            data: {
                body,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                post: {
                    connect: {
                        id: postId,
                    },
                },
            },
        });

        res.status(201).send({
            success: true,
            message: "Successfully created a comment",
            comment,
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
