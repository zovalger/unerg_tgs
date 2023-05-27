import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
} from "@/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath, folder = "images") =>
	await cloudinary.uploader.upload(filePath, { folder });

export const uploadImageBase64 = async (base64Data, folder = "images") =>
	await cloudinary.uploader.upload(base64Data, {
		folder,
	});

export const deleteImage = async (id) => await cloudinary.uploader.destroy(id);
