//React-Next

//Componentes

import { BiTimeFive } from "react-icons/bi";

//Estilos

import styles from "@/styles/Routes/admin/hourBus.module.css";
import moment from "moment";

//*************************** Codigo  ************************/
const HourBus = ({ data }) => {
	const { startTime, endTime } = data;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container__icon}>
					<BiTimeFive />
				</div>

				<div className={styles.text}>
					<h2>Horario</h2>
				</div>

				<div className={styles.container__hours}>
					<div className={styles.titles}>
						<p>Inicio</p>
						<p>Cierre</p>
					</div>

					<div className={styles.hours}>
						<p>{moment(startTime).format("h:mm a")}</p>
						<p>{moment(endTime).format("h:mm a")}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default HourBus;
