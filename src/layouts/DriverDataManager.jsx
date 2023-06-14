import { startInServiceDriver_Request } from "@/api/userDriver.api";
import DriverContext from "@/contexts/Driver.context";
import MapContext from "@/contexts/Map.context";
import ToastContext from "@/contexts/Toast.context";
import UserContext from "@/contexts/User.context";
import { useContext, useEffect, useState } from "react";

const testMode = true;

export const DriverDataManager = () => {
	const { user } = useContext(UserContext);
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);
	const { getCenterMap, getCoordsDevice } = useContext(MapContext);
	const {
		sendCoord_by_socket,
		intervalService,
		setServiceInterval,
		clearIntervalService,
	} = useContext(DriverContext);

	useEffect(() => {
		toogleService();
	}, [user, user?.inService]);

	// todo: funcion para iniciar

	const toogleService = async () => {
		if (user)
			if (user.inService) {
				await start();
			} else {
				await stop();
			}
	};

	const start = async () => {
		if (intervalService) return;

		setServiceInterval(
			setInterval(
				async () => {
					const coord = testMode ? getCenterMap() : await getCoordsDevice();

					console.log(coord);

					sendCoord_by_socket(coord);
				},
				testMode ? 1000 : 10000
			)
		);
	};

	const stop = async () => {
		clearIntervalService();
	};

	return null;
};
