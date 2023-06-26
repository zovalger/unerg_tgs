import style from "@/styles/Routes/routes_view.module.css";
import { BiPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { deleteWaypoint_Request } from "@/api/waypoint.api";
import { RxDragHandleDots1 } from "react-icons/rx";
import { useContext } from "react";
import RutaContext from "@/contexts/Ruta.context";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import MapContext from "@/contexts/Map.context";

export default function WaypointDraggable({
	data,
	index,
	onEdit,
	onDelete,
	draggableId,
}) {
	const { _id, name } = data;
	const { editingRoute, setEditingRoute } = useContext(RutaContext);
	const { insertRuta } = useContext(MapContext);

	function moverElemento(array, index, direccion) {
		const limiteInferior = 0;
		const limiteSuperior = array.length - 1;

		if (index < limiteInferior || index > limiteSuperior) {
			console.error(`El índice ${index} está fuera de los límites del array.`);
			return null;
		}

		if (
			(direccion === -1 && index === limiteInferior) ||
			(direccion === 1 && index === limiteSuperior)
		) {
			console.error(
				`El elemento en el índice ${index} ya está en el límite del array.`
			);
			return null;
		}

		const nuevoIndice = index + direccion;
		const elemento = array[index];
		const nuevoArray = [...array]; // crear una copia del array original
		nuevoArray.splice(index, 1);
		nuevoArray.splice(nuevoIndice, 0, elemento);

		setEditingRoute({ ...editingRoute, waypoints: nuevoArray });
		insertRuta([{ ...editingRoute, waypoints: nuevoArray }]);
		return nuevoArray;
	}

	return (
		<div className={style.botonRuta}>
			<div className={style.delete} onClick={() => onDelete(index, name)}>
				<BsFillTrashFill />
			</div>
			<div className={style.textContainer}>
				<h2>{name}</h2>
			</div>

			<div className={style.edit}>
				<div
					onClick={() => moverElemento(editingRoute.waypoints, index, -1)}
					style={{ marginRight: "1rem" }}
				>
					{index == 0 ? <TbPointFilled /> : <AiOutlineArrowUp />}
				</div>
				<div onClick={() => moverElemento(editingRoute.waypoints, index, 1)}>
					{index == editingRoute.waypoints.length - 1 ? (
						<TbPointFilled />
					) : (
						<AiOutlineArrowDown />
					)}
				</div>
				<div style={{ marginLeft: "3rem" }} onClick={() => onEdit(index)}>
					<BiPencil />
				</div>
			</div>
		</div>
	);
}
