import connectDb from "@/lib/db";
import {
	createBus_controller,
	getAllActiveBuses_controller,
} from "@/controllers/bus.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getAllActiveBuses_controller(req, res);
}
