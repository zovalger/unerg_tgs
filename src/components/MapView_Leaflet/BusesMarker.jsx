import MapContext from "@/contexts/MapContext";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
// import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";
import { VenueLocationIcon } from "./VenueLocationIcon";

const BusesMarker = () => {
	const { Buses } = useContext(MapContext);

	console.log(Buses);

	// const markers =

	return Buses.map((w, i) => (
		<Marker
			key={i}
			position={w.coord}

			// icon={VenueLocationIcon}
		>
			<MarkerPopup data={w} />
		</Marker>
	));
};

export default BusesMarker;
