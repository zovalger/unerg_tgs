const mongoose = require("mongoose");

const BusSchema = mongoose.Schema({
	// name: { type: String, required: true, trim: true },
	// description: { type: String, trim: true },

	num: { type: String, required: true, trim: true, unique: true },
	placa: { type: String, required: true, trim: true, unique: true },

	status: { type: String, default: "a" },

	coord: {
		lat: { type: Number, required: true, default: 0 },
		lng: { type: Number, required: true, default: 0 },
	},

	ruta: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Ruta",
		default: null,
	},

	capacity: { type: Number, default: 0 },
});

export default mongoose.models.Bus || mongoose.model("Bus", BusSchema);
