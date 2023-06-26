const mongoose = require("mongoose");

const BusAveriaSchema = mongoose.Schema({
	bus: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Bus",
	},
	content: { type: String },

	date: { type: Date, default:  Date.now() },
});

export default mongoose.models?.BusAveria ||
	mongoose.model("BusAveria", BusAveriaSchema);
