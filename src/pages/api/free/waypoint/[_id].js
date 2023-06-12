import connectDb from "@/lib/db";
import {
	toggleStatusWaypoint_controller,
	getWaypoint_By_Id_controller,
	updateWaypoint_controller,
} from "@/controllers/waypoint.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getWaypoint_By_Id_controller(req, res);
}
