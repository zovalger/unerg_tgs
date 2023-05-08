import * as Yup from "yup";

export const waypointValidatorSchema = Yup.object({
	name: Yup.string("El nombre debe ser un Texto")
		.trim()
		.required("El nombre es obligatorio")
		.min(3, "El nombre debe ser mayor de 3 letras"),
	description: Yup.string("La descripcion debe ser un Texto")
		.trim()
		.default(""),
	type: Yup.string("El tipo de parada debe ser un Texto")
		.trim()
		.oneOf(["p", "c"], "El tipo de parada no esta entre los aceptados"),
	coord: Yup.object({
		lat: Yup.number("La latitud proporcionada no es un numero")
			.required("La latitud es obligatoria")
			.notOneOf([NaN], "no es un numero"),
		lng: Yup.number("La longitud proporcionada no es un numero")
			.required("La longitud es obligatoria")
			.notOneOf([NaN], "no es un numero"),
	}).required("Las coordenadas son obligatorias"),
});
