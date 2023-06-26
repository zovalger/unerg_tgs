const mongoose = require("mongoose");

const UsersCountSchema = mongoose.Schema({
	socket: String,
	// "admin","driver", "visit"
	role: { type: String, required: true, default: "visit" },
	conectionDate: { type: Date, default: Date.now()},
});

export default mongoose.models.UsersCount ||
	mongoose.model("UsersCount", UsersCountSchema);

	