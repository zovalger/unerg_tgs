import MapContext from "@/contexts/Map.context";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import WaypointControl from "./WaypointControl";
import StopBus_Icon from "./Waypoint_Icon";

import { v4 as uuid } from "uuid";

const WaypointMarker = () => {
	const { Waypoints } = useContext(MapContext);

	return Waypoints.map((w, i) => {
		const { coord, type } = w;

		if (!coord) return;

		const { lat, lng } = coord;
		if (typeof lat != "number" || typeof lng != "number") return;

		return type === "p" ? (
			<Marker key={uuid()} position={w.coord} icon={StopBus_Icon}>
				<MarkerPopup data={w} />
			</Marker>
		) : (
			<WaypointControl key={uuid()} data={w} />
		);
	});
};

export default WaypointMarker;
