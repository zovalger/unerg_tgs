import {
	getAllUserDrivers_controller,

} from "@/controllers/userDriver.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getAllUserDrivers_controller(req, res);
}
