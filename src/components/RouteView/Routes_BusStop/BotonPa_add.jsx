import style from "../../../styles/Routes/routes_view.module.css";
import { BiPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { deleteWaypoint_Request } from "@/api/waypoint.api";

export default function BotonPa_add({ data }) {
	const { name } = data;

	return (
		<div className={style.botonRuta}>
			<div className={style.delete}>
				<BsFillTrashFill />
			</div>

			<div className={style.textContainer}>
				<h2>{name}</h2>
			</div>

			<div className={style.edit}>
				<BiPencil />
			</div>
		</div>
	);
}
