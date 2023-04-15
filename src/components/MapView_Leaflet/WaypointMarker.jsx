import MapContext from "@/contexts/MapContext";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
// import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";
import { VenueLocationIcon } from "./VenueLocationIcon";

const WaypointMarker = () => {
	const { Waypoints } = useContext(MapContext);

	console.log(Waypoints);

	// const markers =

	return Waypoints.map((w, i) => (
		<Marker
			key={i}
			position={w.coord}
			// icon={VenueLocationIcon}
		>
			<MarkerPopup data={w} />
		</Marker>
	));
};

export default WaypointMarker;
