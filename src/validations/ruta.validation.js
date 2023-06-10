import * as Yup from "yup";

export const rutaValidatorSchema = Yup.object({
	name: Yup.string()
		.required("El nombre es obligatorio")
		.min(3, "El nombre es muy corto"),

	description: Yup.string(),

	timetableId: Yup.string("el horario debe ser un text")
		.nonNullable("El horario no puede estar vacio")
		.notOneOf(["null", null], "Seleccione un horario para la ruta"),
});
