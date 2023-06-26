import moment from "moment";

export default function verificInTimetable(timetable) {
	const { startTime, endTime, workDays } = timetable;

	const now = moment(); // obtener la hora actual
	const start = moment(moment(startTime).format("H:mm"), "H:mm"); // hora de inicio en formato H:mm
	const end = moment(moment(endTime).format("H:mm"), "H:mm"); // hora de fin en formato H:mm

	if (!workDays.includes(now.day())) {
		console.log("No trabaja hoy");
		return;
	}

	if (!now.isBetween(start, end)) {
		console.log("no esta entre las horas de trabajo");
		return;
	}

	return true;
}
