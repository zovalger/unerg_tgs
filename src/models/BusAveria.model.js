const mongoose = require("mongoose");

const BusAveriaSchema = mongoose.Schema({
	bus: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Bus",
	},
	content: { type: String },

	date: { type: Date, default: new Date() },
});

export default mongoose.models?.BusAveria ||
	mongoose.model("BusAveria", BusAveriaSchema);
