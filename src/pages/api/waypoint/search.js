import connectDb from "@/lib/db";
import {
	createWaypoint_controller,
	getAllActiveWaypoints_controller,
} from "@/controllers/waypoint.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getAllActiveWaypoints_controller(req, res);
}
