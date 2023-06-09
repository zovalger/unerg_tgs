import connectDb from "@/lib/db";

import {
	getTimetable_By_Id_controller,
	toggleStatusTimetable_controller,
	updateTimetable_controller,
} from "@/controllers/timetable.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "PUT") return await updateTimetable_controller(req, res);
	if (req.method === "GET")
		return await getTimetable_By_Id_controller(req, res);

	if (req.method === "DELETE")
		return await toggleStatusTimetable_controller(req, res);
}
