import ErrorsMessages from "@/config/errorsMessages";
import BusAveriaModel from "@/models/BusAveria.model";

// ********************************************************************
// 								buses: Creacion en la DB
// ********************************************************************

export const createBusAveria_service = async ({ bus, content }) => {
	try {
		const busAveria = new BusAveriaModel({
			bus,
			content,
			date: new Date(),
		});

		await busAveria.save();

		//console.log(busAveria);

		return busAveria;
	} catch (error) {
		console.log(error);
	}
};

export const updateBusAveria_service = async (
	busAveriaId,
	{ bus, content }
) => {
	try {
		// ir guardando las coordenadas que vienen del autobus
		const busAveria = await BusAveriaModel.findById(busAveriaId);

		busAveria.bus = bus;
		busAveria.content = content;

		await busAveria.save();

		return busAveria;
	} catch (error) {
		console.log(error);
	}
};

export const getAllBusAverias_by_busId_service = async (busId) => {
	try {
		// ir guardando las coordenadas que vienen del autobus
		const busAverias = await BusAveriaModel.find({ bus: busId }).sort({
			date: -1,
		});

		return busAverias;
	} catch (error) {
		console.log(error);
	}
};
