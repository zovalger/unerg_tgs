import moment from "moment";
import style from "./TimetableItemList.module.css";

import { Col, Row } from "reactstrap";
import getWeekDayInitials from "@/utils/getWeekDayInitials";

export default function TimetableItemList({ data, onClick }) {
	const { _id, name, startTime, endTime, type, workDays, description } = data;

	return (
		<div className={style.container} onClick={() => onClick(_id)}>
			<div className={style.title}>{name} </div>
			<div className={style.details}>
				<Row>
					<Col sm={6} md={6}>
						<div>Inicio: {moment(startTime).format("LT")}</div>
						<div>Final: {moment(endTime).format("LT")}</div>
					</Col>
					<Col sm={6} md={6}>
						<div>Para: {type === "d" ? "Conductores" : "Rutas"}</div>
						<div>
							Dias:
							{workDays.map((d) => (
								<span key={d}> {getWeekDayInitials(d)} </span>
							))}
						</div>
					</Col>

					<Col sm={12}> {description}</Col>
				</Row>
			</div>
		</div>
	);
}
