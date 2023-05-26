const mongoose = require("mongoose");

const TimetableSchema = mongoose.Schema({
	name: String,
	startTime: Date,
	endTime: Date,
});

export default mongoose.models.Timetable ||
	mongoose.model("Timetable", TimetableSchema);
