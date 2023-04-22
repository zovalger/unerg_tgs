import MapContext from "@/contexts/MapContext";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import Bus_Icon from "./Bus_Icon";

import MarkerPopup from "./MarkerPopup";

const BusMarker = () => {
	const { Buses } = useContext(MapContext);

	return Buses.map((b, i) => {
		const { coord } = b;
		if (!coord) return;

		const { lat, lng } = coord;
		if (typeof lat != "number" || typeof lng != "number") return;

		<Marker key={i} position={b.coord} icon={Bus_Icon}>
			<MarkerPopup data={b} />
		</Marker>;
	});
};

export default BusMarker;
