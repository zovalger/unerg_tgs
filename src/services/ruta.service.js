import RutaModel from "@/models/Ruta.model";

export const createRuta_service = async (data) => {
	try {
		const { name, description, type, state, coord } = data;

		const ruta = new RutaModel({
			name,
			description,
			type,
			state,
			coord,
		});

		await ruta.save();

		return ruta;
	} catch (error) {
		console.log(error);
	}
};

export const getAllRutas_service = async () => {
	try {
		const rutas = await RutaModel.find({ state: { $ne: "d" } });

		return rutas;
	} catch (error) {
		console.log(error);
	}
};

export const getRuta_by_Id_service = async (_id = null) => {
	try {
		const ruta = await RutaModel.findById(_id);

		return ruta;
	} catch (error) {
		console.log(error);
	}
};

export const getRutas_by_Ids_service = async (_ids = null) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

export const getRutas_by_Name_service = async (
	name = null,
	includeDelete = false
) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

export const updateRuta_service = async (_id, data) => {
	try {
		const { name, description, type, state, coord } = data;

		await RutaModel.findByIdAndUpdate(_id, {
			name,
			description,
			type,
			state,
			coord,
		});

		const ruta = await RutaModel.findById(_id);

		console.log(ruta);

		return ruta;
	} catch (error) {
		console.log(error);
	}
};

export const deleteRuta_service = async (_id) => {
	try {
		const ruta = await RutaModel.findById(_id);

		if (ruta.state === "a") {
			ruta.state = "d";
			await ruta.save();
		} else {
			// borrar definitivamente
			// await RutaModel.findByIdAndDelete(_id);
			// console.log(await ruta.remove());
		}

		return ruta;
	} catch (error) {
		console.log(error);
	}
};
