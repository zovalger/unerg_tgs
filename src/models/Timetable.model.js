const mongoose = require("mongoose");

const TimetableSchema = mongoose.Schema({
	name: String,
	startTime: Date,
	endTime: Date,
	type: { type: String, default: "d", enum: ["r", "d"] }, // r: ruta, d: driver
});

export default mongoose.models?.Timetable ||
	mongoose.model("Timetable", TimetableSchema);
