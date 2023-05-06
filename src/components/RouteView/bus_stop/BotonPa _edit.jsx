import style from "../../../styles/Routes/routes_view.module.css";
import { BiPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { deleteWaypoint_Request } from "@/api/waypoint.api";

export default function BotonPa_edit({ data, onClick, onDelete }) {
	const { _id, name } = data;
	const router = useRouter();

	return (
		<div className={style.botonRuta} onClick={onClick}>
			<div className={style.delete} onClick={() => onDelete(_id)}>
				<BsFillTrashFill />
			</div>

			<div className={style.textContainer}>
				<h2>{name}</h2>
			</div>

			<div
				className={style.edit}
				onClick={() => {
					router.push(`./edit/${_id}`);
				}}
			>
				<BiPencil />
			</div>
		</div>
	);
}
