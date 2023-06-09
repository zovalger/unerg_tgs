const mongoose = require("mongoose");

const TimetableSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		default: `horario ${new Date()}`,
		trim: true,
	},

	description: { type: String, default: "", trim: true },

	startTime: {
		type: Date,
		required: true,
		validate: {
			validator: function (startTime) {
				return startTime instanceof Date && !isNaN(startTime);
			},
			message: "Invalid start hour.",
		},
	},
	endTime: {
		type: Date,
		required: true,
		validate: {
			validator: function (endTime) {
				return endTime instanceof Date && !isNaN(endTime);
			},
			message: "Invalid end hour.",
		},
	},

	workDays: {
		type: [
			{
				type: Number,
				required: true,
				min: 0,
				max: 6,
			},
		],
		validate: {
			validator: function (workDays) {
				return (
					workDays.length > 0 &&
					workDays.length <= 7 &&
					new Set(workDays).size === workDays.length
				);
			},
			message: "Invalid work days.",
		},
	},

	type: { type: String, default: "d", enum: ["r", "d"] }, // r: ruta, d: driver
});

TimetableSchema.pre('save', function (next) {
  if (this.isModified('workDays')) {
    this.workDays.sort((a, b) => a - b);
  }
  next();
});



export default mongoose.models?.Timetable ||
	mongoose.model("Timetable", TimetableSchema);
