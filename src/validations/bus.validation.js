import * as Yup from "yup";

export const busValidatorSchema = Yup.object({
	num: Yup.number("No esta colocando un texto")
		.integer("no es un entero")
		.required("El autobus debe tener un numero de identificacion")
		.round("trunc")
		.min(1, "El Numero minimo es 1"),
	placa: Yup.string("La placa debe ser un Texto")
		.trim()
		.uppercase()
		.min(1, "debe colocar la placa"),
});
