const mongoose = require("mongoose");

const RutaSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: String,

	status: { type: String, default: "a" },

	// color: String,

	waypoints: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Waypoint",
		},
	],

	timetableId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Timetable",
		default: null,
	},
});

export default mongoose.models.Ruta || mongoose.model("Ruta", RutaSchema);
