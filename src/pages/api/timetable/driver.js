import connectDb from "@/lib/db";

import { getAllDriverTimetables_controller } from "@/controllers/timetable.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET")
		return await getAllDriverTimetables_controller(req, res);
}
