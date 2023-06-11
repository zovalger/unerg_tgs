import connectDb from "@/lib/db";

import {
	getRuta_By_Id_controller,
	toggleStatusRuta_controller,
	updateRuta_controller,
} from "@/controllers/ruta.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getRuta_By_Id_controller(req, res);
}
