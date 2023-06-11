import { getBus_By_RutaId_controller } from "@/controllers/bus.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getBus_By_RutaId_controller(req, res);
}
