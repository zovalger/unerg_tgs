import { uploadImageBase64_controller } from "@/controllers/files.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST")
		return await uploadImageBase64_controller(req, res);
}
