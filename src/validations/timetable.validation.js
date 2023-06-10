import * as Yup from "yup";

const common = {
	name: Yup.string()
		.required("El nombre es requerido")
		.min(3, "Debe tener minimo 3 letras"),

	type: Yup.string("El tipo de Horario debe ser un Texto")
		.trim()
		.oneOf(["d", "r"], "El tipo de Horario no esta entre los aceptados")
		.default("d"),

	workDays: Yup.array()
		.of(Yup.number().min(0).max(6))
		.required()
		.min(1)
		.max(7)
		.test(
			"is-valid",
			"Invalid work days.",
			(workDays) => new Set(workDays).size === workDays.length
		),
};

export const timetableValidatorSchema = Yup.object().shape({
	...common,

	startTime: Yup.date()
		.required()
		.nullable(false)
		.test(
			"is-valid",
			"Invalid start hour.",
			(startTime) => startTime instanceof Date && !isNaN(startTime)
		),
	endTime: Yup.date()
		.required()
		.nullable(false)
		.test(
			"is-valid",
			"Invalid end hour.",
			(endTime) => endTime instanceof Date && !isNaN(endTime)
		),
});

export const timetableFrontendValidatorSchema = Yup.object().shape({
	...common,

	startTime: Yup.date()
		.required("La hora de inicio es obligatoria")
		.nullable(false)
		.test("date", "formato incorrecto", (value) => {
			console.log(value);
			const hour = value.getHours();
			const minute = value.getMinutes();

			if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) return true;

			return false;
		})
		.transform((value, originalValue) => {
			const [hour, minute] = originalValue.split(":");

			return new Date(0, 0, 0, hour, minute);
		})
		.test(
			"is-valid",
			"Hora de inicio invalida",
			(startTime) => startTime instanceof Date && !isNaN(startTime)
		)
		.max(Yup.ref("endTime"), "La hora de inicio no puede ser mayor a la final"),
	endTime: Yup.date()
		.required("La hora final es obligatoria")
		.nullable(false)
		.test("date", "formato incorrecto", (value) => {
			const hour = value.getHours();
			const minute = value.getMinutes();
			if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) return true;
			return false;
		})
		.transform((value, originalValue) => {
			const [hour, minute] = originalValue.split(":");

			return new Date(0, 0, 0, hour, minute);
		})
		.test(
			"is-valid",
			"Hora de finalizacion invalida",
			(endTime) => endTime instanceof Date && !isNaN(endTime)
		)
		.min(Yup.ref("startTime"), "La hora final no puede ser menor a la inicial"),
});
