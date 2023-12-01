import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaComment, FaHeart, FaUserCircle } from "react-icons/fa";
import { MdOutlineAttachment } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CommentModel from "../Components/Models/CommentModel";
import UserContext from "../context/userContext";

const Home = () => {
    const [postBody, setPostBody] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const [commentModelShown, setCommentModelShown] = useState(false);
    const [postId, setPostId] = useState("");
    const [image, setImage] = useState("");

    const [allPosts, setAllPosts] = useState([]);

    const uploadImage = async (e) => {
        const photo = new FormData();

        photo.append("photo", e.target.files[0]);

        const { data } = await axios.post("/api/v1/image/upload", photo, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        setImage(data.uploadedImageUrl);
    };

    const postAPost = async (e) => {
        e.preventDefault();
        if (!postBody) {
            toast.error("Post body is required");
            return;
        }

        try {
            setIsPosting(true);
            const { data } = await axios.post("/api/v1/post/create", {
                body: postBody,
                image,
            });
            if (data.success) {
                toast.success(data.message);
                setPostBody("");
                setImage("");
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setIsPosting(false);
        }
    };

    const handleLike = async (id) => {
        try {
            const { data } = await axios.post(`/api/v1/post/likeapost/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getAllPosts = async (req, res) => {
            const { data } = await axios.get("/api/v1/post/allPosts");

            if (data) {
                setAllPosts(data.posts);
            }
        };

        getAllPosts();
    }, [isPosting]);

    const { user } = useContext(UserContext);
    return (
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            {commentModelShown && (
                <CommentModel
                    setCommentModelShown={setCommentModelShown}
                    commentBody={commentBody}
                    setCommentBody={setCommentBody}
                    postId={postId}
                />
            )}

            <form className="w-full h-24 border-2 border-white border-opacity-50 px-2 flex items-start py-3 gap-2 relative">
                <div className="flex items-center gap-3 w-full h-full">
                    <div className="h-8 w-8">
                        {user?.profileImage ? (
                            <img
                                src={user?.profileImage}
                                alt=""
                                className="h-full w-full"
                            />
                        ) : (
                            <FaUserCircle className="h-full w-full" />
                        )}
                    </div>
                    <input
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                        type="text"
                        placeholder="What is happening?!"
                        className="bg-transparent border-none outline-none w-full textgray700 text-xl "
                        required
                        aria-required
                    />
                </div>
                <label className="absolute bottom-0 flex gap-1 cursor-pointer">
                    <MdOutlineAttachment size={24} />
                    <input
                        type="file"
                        hidden
                        onChange={(e) => uploadImage(e)}
                    />
                    <span>Upload a image</span>
                </label>

                <button
                    className="absolute right-3 bottom-2 bg-primary px-7 py-2 rounded-full z-10 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={postAPost}
                    disabled={isPosting}
                >
                    {isPosting ? "Posting.." : "Post"}
                </button>

                {image && (
                    <div className="w-full h-48 ">
                        <img src={image} className="rounded-sm" />
                    </div>
                )}
            </form>

            <div
                className="flex flex-col gap-3
             w-full mt-4"
            >
                {allPosts.length &&
                    allPosts.map((post, i) => (
                        <div
                            key={i}
                            className="flex flex-col border border-white border-opacity-30 px-4 py-2"
                        >
                            <div className="flex gap-2 items-center ">
                                <div className="">
                                    <FaUserCircle size={34} />
                                </div>
                                <div className="flex1 w-full">
                                    <Link
                                        className="flex gap-3"
                                        to={`/${post?.user?.id}`}
                                    >
                                        <h1 className="font-bold">
                                            {post?.user?.name}
                                        </h1>
                                        <h2 className="text-gray-500">
                                            @{post?.user?.username}
                                        </h2>
                                        <span className="text-gray-500">
                                            {new Date(
                                                post?.createdAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </Link>

                                    <div>{post?.body}</div>
                                    {post?.image && (
                                        <div className="w-full">
                                            <img
                                                className="w-full h-32 object-cover rounded-lg"
                                                src={post?.image}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-start gap-8 px-10">
                                <div
                                    className="flex items-center gap-1 cursor-pointer hover:text-primary"
                                    onClick={() => {
                                        setCommentModelShown(true);
                                        setPostId(post?.id);
                                    }}
                                >
                                    <span>
                                        <FaComment />
                                    </span>
                                    <span>{post?.comments?.length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div
                                        onClick={() => handleLike(post.id)}
                                        className="cursor-pointer flex items-center gap-2 hover:text-red-500"
                                    >
                                        <span>
                                            <FaHeart
                                                fill={
                                                    post.likedIds.includes(
                                                        user.id
                                                    )
                                                        ? "red"
                                                        : "white"
                                                }
                                            />
                                        </span>
                                        <span>{post?.likedIds?.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
