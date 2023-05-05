import MapContext from "@/contexts/Map.context";
import { useContext, useState } from "react";
import { Circle, useMapEvents } from "react-leaflet";

export default function CenterOfMap() {
	const { getCenterMap } = useContext(MapContext);
	const [center, setCenter] = useState([0, 0]);

	useMapEvents({
		move: () => {
			const coord = getCenterMap();

			if (!coord) return;

			setCenter(coord);
		},
	});

	return <Circle center={center} radius={5} />;
}
