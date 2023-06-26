import { getStadisticIndexation_controller } from "@/controllers/stadistic.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET")
		return await getStadisticIndexation_controller(req, res);
}
