// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendEmailToChangePasswordUser_controller } from "@/controllers/auth.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST")
		return await sendEmailToChangePasswordUser_controller(req, res);
}
