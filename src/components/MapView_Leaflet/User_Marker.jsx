import MapContext from "@/contexts/MapContext";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";

import MarkerPopup from "./MarkerPopup";
import User_Icon from "./User_Icon";

const UserMarker = () => {
	const { userCoord, viewUserCoord } = useContext(MapContext);

	if (!viewUserCoord) return null;

	return (
		<Marker position={userCoord} icon={User_Icon}>
			<MarkerPopup data={{ name: "Tu" }} />
		</Marker>
	);
};

export default UserMarker;
