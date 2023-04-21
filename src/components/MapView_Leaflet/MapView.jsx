import MapContext from "@/contexts/MapContext";
import { useContext, useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	Circle,
	useMapEvents,
} from "react-leaflet";
import BusMarker from "./Bus_Marker";
import WaypointMarker from "./Waypoint_Marker";
import RutasLines from "./RutasLines";
import UserMarker from "./User_Marker";

//CSS
import style from "../../styles/Map/map.module.css";

const MapView = () => {
	const { setMap, getCenterMap } = useContext(MapContext);

	function CenterOfMap() {
		const [center, setCenter] = useState([0, 0]);

		useMapEvents({
			move: () => {
				setCenter(getCenterMap());
			},
		});

		return <Circle center={center} radius={5} />;
	}

	return (
		<MapContainer
			className={style.map}
			center={{ lat: 9.9030296, lng: -67.3761181 }}
			zoom={14}
			scrollWheelZoom={true}
			ref={setMap}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<WaypointMarker />
			<BusMarker />
			<RutasLines />
			<UserMarker />
			<CenterOfMap />
		</MapContainer>
	);
};

export default MapView;
