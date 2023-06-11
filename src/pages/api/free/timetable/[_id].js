import connectDb from "@/lib/db";

import {
	getTimetable_By_Id_controller,
	toggleStatusTimetable_controller,
	updateTimetable_controller,
} from "@/controllers/timetable.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET")
		return await getTimetable_By_Id_controller(req, res);

}
