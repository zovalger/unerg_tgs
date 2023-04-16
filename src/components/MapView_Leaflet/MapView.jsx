import MapContext from "@/contexts/MapContext";
import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import BusesMarker from "./BusesMarker";
import WaypointMarker from "./waypointMarker";

//CSS
import style from '../../styles/Map/map.module.css'

const MapView = () => {
	const { setMap, getCenterMap } = useContext(MapContext);

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
			<BusesMarker />
			{/* <Marker position={{ lat: 9.9030296, lng: -67.3761181 }}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker> */}
		</MapContainer>
	);
};

export default MapView;
