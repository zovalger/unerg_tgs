import { getRuta_By_BusId_controller } from "@/controllers/ruta.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getRuta_By_BusId_controller(req, res);
}
