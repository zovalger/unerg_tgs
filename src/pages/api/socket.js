import connectDb from "@/lib/db";

import { socketInit } from "@/controllers/socket.controller";

export default async function handler(req, res) {
	await connectDb();
	

	socketInit(req, res);
}
