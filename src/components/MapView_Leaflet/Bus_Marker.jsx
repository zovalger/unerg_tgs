import MapContext from "@/contexts/MapContext";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
// import { VenueLocationIcon } from "./VenueLocationIcon";
import Bus_Icon from "./Bus_Icon";

import MarkerPopup from "./MarkerPopup";

const BusMarker = () => {
	const { Buses } = useContext(MapContext);

	console.log(Buses);

	// const markers =

	return Buses.map((w, i) => (
		<Marker
			key={i}
			position={w.coord}

			icon={Bus_Icon}
		>
			<MarkerPopup data={w} />
		</Marker>
	));
};

export default BusMarker;
