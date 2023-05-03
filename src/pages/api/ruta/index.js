import connectDb from "@/lib/db";
import {
	createWaypoint_controller,
	getAllWaypoints_controller,
} from "@/controllers/waypoint.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await createWaypoint_controller(req, res);
	if (req.method === "GET") return await getAllWaypoints_controller(req, res);
}
