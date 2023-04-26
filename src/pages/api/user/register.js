// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/lib/db";

import { registerUser_controller } from "@/controllers/user.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await registerUser_controller(req, res);
}
