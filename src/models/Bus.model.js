const mongoose = require("mongoose");

const BusSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: String,

	state: { type: String, default: "a" },

	coord: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},

	// idRuta: objectId( Ruta ),
	capacity: Number,

	num: String,
	placa: String,
});

export default mongoose.models.Bus || mongoose.model("Bus", BusSchema);
