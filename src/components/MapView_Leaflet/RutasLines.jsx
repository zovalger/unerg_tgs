import MapContext from "@/contexts/MapContext";
import { useContext, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import StopBus_Icon from "./Waypoint_Icon";

const RutasLines = () => {
	const { Rutas, map } = useContext(MapContext);

	return Rutas.map((r) => <Routing key={r._id} data={r} map={map} />);
};

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
		}).addTo(map);

		return () => map.removeControl(routingControl);
	}, [map]);

	return null;
}

export default RutasLines;
