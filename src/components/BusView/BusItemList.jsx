import style from "./BusItemList.module.css";

export default function BusItemList({ data, onClick }) {
	const { _id, num, placa, ruta } = data;

	// const {  } = datos;
	return (
		<div className={style.container} onClick={() => onClick(_id)}>
			<div className={style.title}> {placa}</div>
			<div className={style.details}>
				<div>Numero: {num}</div>
				
				{ruta ? (
					<>
						<div>Ruta: {ruta.name}</div>
						<div className={style.light}>{ruta.description}</div>
					</>
				) : (
					<div>Ruta: No asignada</div>
				)}
			</div>
		</div>
	);
}
