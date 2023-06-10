import connectDb from "@/lib/db";
import {
	toggleStatusBus_controller,
	getBus_By_Id_controller,
	updateBus_controller,
} from "@/controllers/bus.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getBus_By_Id_controller(req, res);
	if (req.method === "PUT") return await updateBus_controller(req, res);
	if (req.method === "DELETE") return await toggleStatusBus_controller(req, res);
}
