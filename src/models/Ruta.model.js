const mongoose = require("mongoose");

const RutaSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: String,

	status: { type: String, default: "a" },

	coord: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},

	// color: String,

	waypoints: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Waypoint",
		},
	],

	// idTimetable: objectId( Ruta_Timetable )
});

export default mongoose.models.Ruta || mongoose.model("Ruta", RutaSchema);