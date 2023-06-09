import ErrorsMessages from "@/config/errorsMessages";
import TimetableModel from "@/models/Timetable.model";

export const createTimetable_service = async (data) => {
	const { name, startTime, endTime, workDays, type, description } = data;

	try {
		const timetable = new TimetableModel(
			name,
			startTime,
			endTime,
			workDays,
			type,
			description
		);

		await timetable.save();

		return timetable;
	} catch (error) {
		console.log(error);
	}
};

export const getTimetable_by_Id_service = async (_id) => {
	try {
		const timetable = await TimetableModel.findById(_id);

		return timetable;
	} catch (error) {
		console.log(error);
	}
};

export const getAllTimetables_service = async () => {
	try {
		const timetables = await TimetableModel.find().sort({ name: 1, type: 1 });

		return timetables;
	} catch (error) {
		console.log(error);
	}
};

export const getAllDriverTimetables_service = async () => {
	try {
		const timetables = await TimetableModel.find({ type: "d" });

		return timetables;
	} catch (error) {
		console.log(error);
	}
};

export const getAllRutaTimetables_service = async () => {
	try {
		const timetables = await TimetableModel.find({ type: "r" });

		return timetables;
	} catch (error) {
		console.log(error);
	}
};

export const updateTimetable_service = async (_id, data) => {
	const { name, startTime, endTime, workDays, description } = data;

	try {
		await TimetableModel.updateOne(
			{ _id },
			name,
			startTime,
			endTime,
			workDays,
			description
		);

		const timetable = await getTimetable_by_Id_service(_id);

		return timetable;
	} catch (error) {
		console.log(error);
	}
};

export const toggleTimetable_service = async (_id) => {
	if (!_id) return;

	try {
		// se busca el bus con el id
		const timetable = await TimetableModel.findById(_id);

		// si no se encuentra se devuelve un error de no encontrado
		if (!timetable) return { error: true, message: ErrorsMessages.notFound };

		// se intercambia el status
		timetable.status = timetable.status === "a" ? "d" : "a";

		// guadar los cambios
		await timetable.save();

		return timetable;
	} catch (error) {
		console.log(error);
	}
};

export const deleteTimetable_service = async () => {};
