import { finishBusTravel_controller } from "@/controllers/busTravel.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await finishBusTravel_controller(req, res);
}
