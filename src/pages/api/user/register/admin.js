import { registerUserAdmin_controller } from "@/controllers/userAdmin.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST")
		return await registerUserAdmin_controller(req, res);
}
