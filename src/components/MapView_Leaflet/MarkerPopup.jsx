import { Popup } from "react-leaflet";

const MarkerPopup = (props) => {
	const { name } = props.data;

	if (!name) return;

	return (
		<Popup>
			<div>{name}</div>
		</Popup>
	);
};

export default MarkerPopup;
