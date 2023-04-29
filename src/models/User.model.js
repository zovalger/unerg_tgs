const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	name: String,
	lastname: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	// "admin","driver"
	role: { type: String, required: true, default: "driver" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
