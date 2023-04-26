// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/lib/db";

import { loginUser_controller } from "@/controllers/user.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await loginUser_controller(req, res);
}
