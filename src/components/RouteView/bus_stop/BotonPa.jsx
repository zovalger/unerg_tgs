import style from "../../../styles/Routes/routes_view.module.css";

export default function BotonPa({ data, onClick }) {
	const { name, description } = data;
	const km = 0;

	return (
		<div className={style.botonRuta} onClick={onClick}>
			<div className={style.textContainer__lu}>
				<h2>{name}</h2>
				<p>{description}</p>
			</div>
			<div className={style.textContainer__km}>
				<p>{km} km</p>
			</div>
		</div>
	);
}
