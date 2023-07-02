import moment from "moment";
import styles from "./BusTravelItem.module.css";

const BusTravelItem = ({ data, indexation }) => {
	const startDate = data.startDate;
	const endDate = data.endDate;
	const ruta = indexation.rutas[data.ruta];
	const driver = indexation.drivers[data.driver];
	const bus = indexation.buses[data.bus];
	const timetableDriver = indexation.timetables[data.timetableDriver];
	const timetableRuta = indexation.timetables[data.timetableRuta];

	return (
		<div className={styles.container}>
			<div>Inicio: {moment(startDate).format("YYYY-MM-DD hh:mm a")}</div>
			<div>Final: {moment(endDate).format("YYYY-MM-DD hh:mm a")}</div>
			<div>{ruta.name}</div>
			<div>{driver.name}</div>
			<div>
				Horario del conductor: {`Numero: ${bus.num} - Placa: ${bus.placa}`}
			</div>
			<div>
				{`${timetableDriver.name}: ${moment(timetableDriver.startTime).format(
					"h:mm a"
				)} - ${moment(timetableDriver.endTime).format("h:mm a")}`}
			</div>
			<div>
				Horario de ruta: 
				{` ${timetableRuta.name}: ${moment(timetableRuta.startTime).format(
					"h:mm a"
				)} - ${moment(timetableRuta.endTime).format("h:mm a")}`}
			</div>
		</div>
	);
};
export default BusTravelItem;
