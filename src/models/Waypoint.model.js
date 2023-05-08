const mongoose = require("mongoose");

const WaypointSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, default: "" },

	// p: parada, c: control
	type: { type: String, required: true, default: "p", enum: ["p", "c"] },

	status: { type: String, default: "a" },

	coord: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
});

export default mongoose.models.Waypoint ||
	mongoose.model("Waypoint", WaypointSchema);
