import connectDb from "@/lib/db";

import {
	deleteRuta_controller,
	getRuta_By_Id_controller,
	updateRuta_controller,
} from "@/controllers/ruta.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getRuta_By_Id_controller(req, res);
	if (req.method === "PUT") return await updateRuta_controller(req, res);
	if (req.method === "DELETE") return await deleteRuta_controller(req, res);
}
