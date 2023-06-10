import {
	getUserDriver_by_Id_controller,
	updateUserDriver_controller,
} from "@/controllers/userDriver.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "PUT") return await updateUserDriver_controller(req, res);
	if (req.method === "GET")
		return await getUserDriver_by_Id_controller(req, res);
}
