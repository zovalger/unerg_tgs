const permissionsSystem = {
	waypointView: "Paradas: Ver registros",
	waypointEdit: "Paradas: Editar registros",

	rutaView: "Ruta: Ver registros",
	rutaEdit: "Ruta: Editar registros",

	busView: "Autobuses: Ver registros",
	busEdit: "Autobuses: Editar registros",

	driverView: "Conductores: Ver registros",
	driverEdit: "Conductores: Editar registros",

	adminView: "Administradores: Ver registros",
	adminEdit: "Administradores: Editar registros",

	chatView: "Mensajes: Ver chats",
};

export const getAllPermissions = () => {
	let p = [];
	for (const key in permissionsSystem) {
		if (Object.hasOwnProperty.call(permissionsSystem, key)) {
			p.push(key);
		}
	}
	return p;
};

export default permissionsSystem;
