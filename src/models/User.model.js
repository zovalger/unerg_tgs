const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	name: String,
	lastname: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
