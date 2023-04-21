import MapContext from "@/contexts/MapContext";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import Bus_Icon from "./Bus_Icon";

import MarkerPopup from "./MarkerPopup";

const BusMarker = () => {
	const { Buses } = useContext(MapContext);

	return Buses.map((w, i) => (
		<Marker key={i} position={w.coord} icon={Bus_Icon}>
			<MarkerPopup data={w} />
		</Marker>
	));
};

export default BusMarker;
