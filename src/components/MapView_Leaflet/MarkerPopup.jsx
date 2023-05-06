import { Popup } from "react-leaflet";

const MarkerPopup = ({ data }) => {
	const { name } = data;

	if (!name) return;

	return (
		<Popup>
			<div>{name}</div>
		</Popup>
	);
};

export default MarkerPopup;
