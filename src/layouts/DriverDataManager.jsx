import DriverContext from "@/contexts/Driver.context";
import MapContext from "@/contexts/Map.context";
import UserContext from "@/contexts/User.context";
import { useContext, useEffect, useState } from "react";

const testMode = false;

export const DriverDataManager = () => {
	const { user } = useContext(UserContext);
	const { getCenterMap, userCoord, getCoordsDevice } = useContext(MapContext);
	const { sendCoord_by_socket } = useContext(DriverContext);

	const [inService, setInService] = useState(null);

	useEffect(() => {
		console.log(user);
		if (user)
			if (user.inService) {
				setInService(
					setInterval(
						() => {
							getCoordsDevice();
							sendCoord_by_socket(testMode ? getCenterMap() : userCoord);
						},
						testMode ? 1000 : 1000
					)
				);
			}

		return () => {
			clearInterval(inService);
		};
	}, [user, user?.inService]);

	return null;
};
