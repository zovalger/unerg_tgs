const mongoose = require("mongoose");

const BusTravelSchema = mongoose.Schema({
	startDate: { type: Date, required: true, default: Date.now() },
	endDate: { type: Date, default: null },

	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Driver",
	},
	timetableDriver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Timetable",
	},

	bus: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Bus",
	},

	ruta: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Ruta",
	},

	timetableRuta: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Timetable",
	},

	// ruta completa
	waypoints: [
		{
			coord: {
				lat: { type: Number, required: true, default: 0 },
				lng: { type: Number, required: true, default: 0 },
			},
			date: { type: Date, required: true },
		},
	],

	// paradas visitadas
	waypointsVisited: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Waypoint",
		},
	],
});

export default mongoose.models?.BusTravel ||
	mongoose.model("BusTravel", BusTravelSchema);
