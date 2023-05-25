import connectDb from "@/lib/db";

import { registerUserDriver_controller } from "@/controllers/user.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await registerUserDriver_controller(req, res);
}
