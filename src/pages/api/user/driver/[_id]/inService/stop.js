import { stopInServiceUserDriver_controller } from "@/controllers/userDriver.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST")
		return await stopInServiceUserDriver_controller(req, res);
}
