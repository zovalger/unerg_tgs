import MapContext from "@/contexts/Map.context";
import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import BusMarker from "./Bus_Marker";
import WaypointMarker from "./Waypoint_Marker";
import RutasLines from "./RutasLines";
import UserMarker from "./User_Marker";
import CenterOfMap from "./CenterOfMap";

//CSS
import style from "../../styles/Map/map.module.css";

const MapView = () => {
	const { map } = useContext(MapContext);

	return (
		<MapContainer
			className={style.map}
			center={{ lat: 9.9030296, lng: -67.3761181 }}
			zoom={14}
			scrollWheelZoom={true}
			attributionControl={false}
			ref={map}
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
