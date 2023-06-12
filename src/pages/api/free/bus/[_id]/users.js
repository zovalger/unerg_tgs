import connectDb from "@/lib/db";

import { getUserDriver_by_BusId_controller } from "@/controllers/userDriver.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET")
		return await getUserDriver_by_BusId_controller(req, res);
}
