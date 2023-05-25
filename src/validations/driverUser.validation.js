import * as Yup from "yup";

export const driverUserValidatorSchema = Yup.object({
	name: Yup.string("El nombre debe ser un Texto")
		.trim()
		.required("El nombre es obligatorio")
		.min(3, "El nombre debe ser mayor de 3 letras"),

	lastname: Yup.string(),
	CI: Yup.string().transform((value, originalValue) => {
		if (!originalValue) return "";

		return originalValue.toString().replace(/\D/g, "");
	}),
	birthdate: Yup.date(),
	address: Yup.string(),
	bloodType: Yup.string(),
	phone: Yup.string(),
	emergencyPhone: Yup.string(),
	email: Yup.string().email(),
	// busId,
	// timetableId,
});
