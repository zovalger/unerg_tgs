//React-Next
import { useState } from "react";

//Componentes

import { TbBus } from "react-icons/tb";
import { GrCaretNext } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";

//Estilos

import styles from "@/styles/Routes/admin/btnBus.module.css";
import { AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/router";
//Contextos

//*************************** Codigo  ************************/
export default function BtnBus({ data }) {
	const router = useRouter();
	const { _id: rutaId } = router.query;

	const { _id, num, placa, capacity } = data;

	// const [porcentaje, SetPorcentaje] = useState(0); //temporal
	// const SumNum = () => {
	// 	if (porcentaje < 100) SetPorcentaje(porcentaje + 5);
	// };

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container__icon}>
					<TbBus className={styles.icon_bus} />
				</div>

				<div className={styles.container__info}>
					<div className={styles.top}>
						<h2>Unidad {num} </h2>
						{/* <p>6 km</p>  */}
					</div>
					<div className={styles.bottom}>
						<div className={styles.container__icon}>
							<FiUsers className={styles.icon_user} />
						</div>

						<div
							className={styles.container_porcentaje}
							// onClick={SumNum}
						>
							<div
								className={styles.porcentaje}
								style={{ width: `${capacity}%` }}
							></div>
							{/* Heredar */}
						</div>

						<div className={styles.text}>
							<p>{capacity}%</p> {/* Heredar */}
						</div>
					</div>
				</div>

				<div
					className={styles.container__icon}
					onClick={() => {
						router.push(`./${rutaId}/${_id}`);
					}}
				>
					<AiOutlineRight className={styles.icon_next} />
				</div>
			</div>
		</>
	);
}
