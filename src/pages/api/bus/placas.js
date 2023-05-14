import connectDb from "@/lib/db";
import {

	getAllPlacas_controller,
} from "@/controllers/bus.controller";

export default async function handler(req, res) {
	await connectDb();
	if (req.method === "GET") return await getAllPlacas_controller(req, res);
}
