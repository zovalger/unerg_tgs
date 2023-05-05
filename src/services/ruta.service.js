import RutaModel from "@/models/Ruta.model";
import { createOrUpdateWapoint_service } from "./waypoint.service";

export const createRuta_service = async (data) => {
	try {
		const { name, description, waypoints } = data;

		// ver si hay una ruta con el mismo nombre
		const oldRuta = await RutaModel.findOne({ name: new RegExp(name, "i") });
		if (oldRuta) return { error: "ya existe una ruta con ese nombre" };

		//  recorrer los waypoint para ver los que no estan creados
		const waypointIds = await Promise.all(
			await waypoints.map(async (w) => {
				console.log(w);
				if (typeof w === "string") return w;

				const waypoint = await createOrUpdateWapoint_service(w);

				return waypoint._id.toString();
			})
		);

		// crear la ruta

		console.log(waypointIds);

		const ruta = new RutaModel({
			name,
			description,
			waypoints: waypointIds,
		});

		console.log(ruta);

		// devolverla al front
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
		const { name, description, waypoints } = data;

		const ruta = await RutaModel.findById(_id);

		if (!ruta) return { error: "No existe la ruta a actualizar" };

		const waypointIds = await Promise.all(
			await waypoints.map(async (w) => {
				console.log(w);
				if (typeof w === "string") return w;

				const waypoint = await createOrUpdateWapoint_service(w);

				return waypoint._id.toString();
			})
		);

		await ruta.update({ name, description, waypoints: waypointIds });

		console.log(ruta);

		return ruta;
	} catch (error) {
		console.log(error);
	}
};

export const deleteRuta_service = async (_id) => {
	try {
		const ruta = await getRuta_by_Id_service(_id);

		console.log(ruta);

		if (!ruta) return;

		if (ruta.status === "a") {
			ruta.status = "d";
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
