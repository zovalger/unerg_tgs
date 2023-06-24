import {
	createBusAveria_controller,
	getAllBusAveria_by_busId_controller,
} from "@/controllers/busAveria.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET")
		return await getAllBusAveria_by_busId_controller(req, res);
	if (req.method === "POST") return await createBusAveria_controller(req, res);
}
