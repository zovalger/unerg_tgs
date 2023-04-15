import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const MapView = () => {
	const [isBrowser, setIsBrowser] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setIsBrowser(true);
		}, 1000);
	}, []);

	if (!isBrowser) return null;

	return isBrowser ? (
		<MapContainer
			center={{ lat: 9.9030296, lng: -67.3761181 }}
			zoom={14}
			scrollWheelZoom={false}
		>
			<TileLayer
				// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* <Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker> */}
		</MapContainer>
	) : (
		""
	);
};

export default MapView;
