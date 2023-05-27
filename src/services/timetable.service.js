import ErrorsMessages from "@/config/errorsMessages";
import TimetableModel from "@/models/Timetable.model";

export const createTimetable_service = async (data) => {};

export const getTimetable_service = async (_id) => {};

export const getAllTimetables_service = async () => {
	try {
		const timetables = await TimetableModel.find();

		console.log(timetables);

		return timetables;
	} catch (error) {
		console.log(error);
	}
};

export const updateTimetable_service = async () => {};

export const deleteTimetable_service = async () => {};
