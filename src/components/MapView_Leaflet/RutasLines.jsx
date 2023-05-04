import MapContext from "@/contexts/Map.context";
import { useContext, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import StopBus_Icon from "./Waypoint_Icon";

const RutasLines = () => {
	const { Rutas, map } = useContext(MapContext);

	return Rutas.map((r) => {
		const error = r.waypoints.findIndex((w) => {
			const { lat, lng } = w;
			if (typeof lat != "number" || typeof lng != "number") return true;
		});

		console.log();
		if (error >= 0) return;

		return <Routing key={r._id} data={r} map={map} />;
	});
};

function createCustomMarker(i, wp, nWps) {
	var markerOptions = {
		icon: L.icon({
			iconUrl: "/hidden_icon.png",
			iconSize: [1, 1],
		}),
		draggable: false,
	};

	return L.marker(wp.latLng, markerOptions);
}

function Routing({ data, map }) {
	const { waypoints, color } = data;

	useEffect(() => {
		if (!map) return;

		const routingControl = L.Routing.control({
			waypoints,
			addWaypoints: false,
			draggableWaypoints: false,
			show: false,
			waypointIcon: StopBus_Icon,
			createMarker: createCustomMarker,
		}).addTo(map);

		return () => map.removeControl(routingControl);
	}, [map]);

	return null;
}

export default RutasLines;
