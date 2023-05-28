import { setPasswordUser_controller } from "@/controllers/auth.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await setPasswordUser_controller(req, res);
}
