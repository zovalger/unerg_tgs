import * as Yup from "yup";

export const timetableValidatorSchema = Yup.object().shape({
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
});
