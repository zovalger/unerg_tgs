import MapContext from "@/contexts/Map.context";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import StopBus_Icon from "./Waypoint_Icon";

const WaypointMarker = () => {
	const { Waypoints } = useContext(MapContext);

	return Waypoints.map((w, i) => {
		const { coord } = w;

		if (!coord) return;

		const { lat, lng } = coord;
		if (typeof lat != "number" || typeof lng != "number") return;

		return (
			<Marker key={w._id || i} position={w.coord} icon={StopBus_Icon}>
				<MarkerPopup data={w} />
			</Marker>
		);
	});
};

export default WaypointMarker;
