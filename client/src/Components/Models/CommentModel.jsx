import axios from "axios";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const CommentModel = ({
    commentBody,
    setCommentBody,
    setCommentModelShown,
    postId,
}) => {
    const handleComment = async () => {
        if (!commentBody) {
            toast.error("Body is required to comment on post");
            return;
        }

        try {
            const { data } = await axios.post(
                `/api/v1/comment/create/${postId}`,
                { body: commentBody }
            );
            if (data.success) {
                toast.success("comment  successful");
                setCommentModelShown(false);
            }
            console.log(data);
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed w-screen h-screen z-20 bg-black bg-opacity-50">
            <div className="w-full h-full relative">
                <div className="absolute -translate-y-1/2 h-48 w-full max-w-md top-1/2 bg-black border-2 rounded-xl px-4 py-2">
                    <div className="relative w-full h-full">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-xl">Comment</h1>
                            <IoCloseSharp
                                size={24}
                                className="cursor-pointer"
                                onClick={() => setCommentModelShown(false)}
                            />
                        </div>
                        <div className="">
                            <textarea
                                value={commentBody}
                                onChange={(e) => setCommentBody(e.target.value)}
                                className="w-full h-full border-none outline-none bg-transparent"
                                placeholder="Type a comment"
                                required
                            />
                        </div>
                        <button
                            className="absolute right-0 bg-primary px-6 py-1 rounded-full"
                            onClick={handleComment}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModel;
