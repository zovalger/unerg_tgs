import { sign } from "jsonwebtoken";
import UserModel from "@/models/User.model";
import { SECRET_WORD } from "@/config";

export const createUser_service = async ({
	name,
	lastname,
	email,
	password,
}) => {
	try {
		const oldUser = await UserModel.findOne({ email });

		if (oldUser) return { error: { message: "Correo ya esta registrado" } };

		const newUser = await UserModel.create({
			name,
			lastname,
			email,
			password: sign(password, SECRET_WORD),
		});

		console.log(newUser);

		return newUser;
	} catch (error) {
		console.log(error);
	}
};

export const loginUser_service = async ({ email, password }) => {
	try {

		console.log(email,password);
		const user = await UserModel.findOne({
			email,
			password: sign(password, SECRET_WORD),
		});

		console.log(user);

		if (!user) return;

		return user;
	} catch (error) {
		console.log(error);
	}
};
