import connectDb from "@/lib/db";
import { sendEmailToChangePasswordUser_controller } from "@/controllers/auth.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST")
		return await sendEmailToChangePasswordUser_controller(req, res);
}
