import connectDb from "@/lib/db";

import {
	createTimetable_controller,
	getAllTimetables_controller,
} from "@/controllers/timetable.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await createTimetable_controller(req, res);
	if (req.method === "GET") return await getAllTimetables_controller(req, res);
}
