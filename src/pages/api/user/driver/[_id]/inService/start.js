import { startInServiceUserDriver_controller } from "@/controllers/userDriver.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST")
		return await startInServiceUserDriver_controller(req, res);
}
