import MapContext from "@/contexts/Map.context";
import { useContext, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import StopBus_Icon from "./Waypoint_Icon";

const RutasLines = () => {
	const { Rutas, map } = useContext(MapContext);

	return Rutas.map((r) => {
		if (!r) return;
		if (!r.waypoints) return;
		const error = r.waypoints?.findIndex((w) => {
			const { lat, lng } = w.coord;
			if (typeof lat != "number" || typeof lng != "number") return true;
		});

		console.log(error);
		if (error >= 0) return;

		return <Routing key={r._id} data={r} map={map} />;
	});
};

function Routing({ data, map }) {
	const { waypoints, color } = data;

	useEffect(() => {
		if (!map.current) return;
		console.log(map);
		const thisMap = map.current;

		const toSee = waypoints.map((w) => w.coord);
		console.log(toSee);
		const routingControl = L.Routing.control({
			waypoints: toSee,
			addWaypoints: false,
			draggableWaypoints: false,
			show: false,
			waypointIcon: StopBus_Icon,
			createMarker: createCustomMarker,
		}).addTo(map.current);

		return () => {
			if (thisMap) thisMap.removeControl(routingControl);
		};
	}, [map.current, waypoints]);

	return null;
}

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

export default RutasLines;
