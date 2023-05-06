import { Circle } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";

export default function WaypointControl({ data }) {
	const { coord, name } = data;

	return (
		<Circle center={coord} radius={5} color="red">
			{<MarkerPopup data={data} />}
		</Circle>
	);
}
