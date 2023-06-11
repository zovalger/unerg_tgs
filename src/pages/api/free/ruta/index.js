import connectDb from "@/lib/db";

import {
	createRuta_controller,
	getAllRutas_controller,
} from "@/controllers/ruta.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getAllRutas_controller(req, res);
}
