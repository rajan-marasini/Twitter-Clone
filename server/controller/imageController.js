import { cloudinary } from "../config/cloudinaryConfig.js";

export const uploadImage = async (req, res) => {
    try {
        const file = req.file;

        let uploadedImageUrl = "";

        await new Promise(async (resolve, reject) => {
            await cloudinary.uploader
                .upload_stream({ resource_type: "image" }, (error, result) => {
                    if (error) {
                        console.log(error.message);
                        reject({ message: "Image upload failed" });
                    } else {
                        uploadedImageUrl = result.secure_url;
                        resolve();
                    }
                })
                .end(file.buffer);
        });
        res.status(200).send({ uploadedImageUrl });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
