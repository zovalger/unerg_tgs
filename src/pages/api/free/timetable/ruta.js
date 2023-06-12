import connectDb from "@/lib/db";

import { getAllRutaTimetables_controller } from "@/controllers/timetable.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET")
		return await getAllRutaTimetables_controller(req, res);
}
