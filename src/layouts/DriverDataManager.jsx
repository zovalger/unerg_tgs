import { startInServiceDriver_Request } from "@/api/userDriver.api";
import DriverContext from "@/contexts/Driver.context";
import MapContext from "@/contexts/Map.context";
import ToastContext from "@/contexts/Toast.context";
import UserContext from "@/contexts/User.context";
import { useContext, useEffect, useState } from "react";

const testMode = true;

export const DriverDataManager = () => {
	const { user } = useContext(UserContext);
	const { ourRuta } = useContext(DriverContext);
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);
	const {
		getCenterMap,
		getCoordsDevice,
		toogleViewUserCoord,
		setUserCoord,
		setCenterMap,
	} = useContext(MapContext);
	const {
		sendCoord_by_socket,
		intervalService,
		setServiceInterval,
		clearIntervalService,
		saveCoordInBusTravel,
	} = useContext(DriverContext);

	useEffect(() => {
		toogleService();
	}, [user, user?.inService, ourRuta]);

	// todo: funcion para iniciar

	const toogleService = async () => {
		if (user)
			if (user.role == "driver")
				if (user.inService && ourRuta) {
					await start();
				} else {
					await stop();
				}
	};

	const start = async () => {
		if (intervalService) return;

		toogleViewUserCoord(true);

		setServiceInterval(
			setInterval(
				async () => {
					const coord = testMode ? getCenterMap() : await getCoordsDevice();

					// guardar recorrido
					await saveCoordInBusTravel(coord);

					// colocar pos en el mapa
					setUserCoord(coord);
					setCenterMap(coord, 16);

					sendCoord_by_socket(coord);
				},
				testMode ? 1000 : 7000
			)
		);
	};

	const stop = async () => {
		clearIntervalService();
	};

	return null;
};
