import connectDb from "@/lib/db";
import { getAllNum_controller } from "@/controllers/bus.controller";

export default async function handler(req, res) {
	await connectDb();
	if (req.method === "GET") return await getAllNum_controller(req, res);
}
