import MapContext from "@/contexts/MapContext";
import { useContext, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import StopBus_Icon from "./Waypoint_Icon";

const RutasLines = () => {
	const { Rutas, map } = useContext(MapContext);

	return Rutas.map((r) => <Routing key={r._id} data={r} map={map} />);
};

function createCustomMarker(i, wp, nWps) {
	var markerOptions = {
		icon: L.icon({
			iconUrl: "/StopBus_icon.png", // ruta al archivo de icono personalizado
			iconSize: [32, 32], // tamaño del icono
		}),
		draggable: false, // la opción 'draggable' determina si el marcador se puede arrastrar
	};

	return L.marker(wp.latLng, markerOptions);
}

function Routing({ data, map }) {
	const { waypoints } = data;

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
