// React/Next

import Image from "next/image";
import Link from "next/link";

//Componentes

//Estilos

import styles from "@/styles/Users/admin/Conductores/btn_conductor.module.css";

//Contextos

//****************************  Codigo  *******************************//
const Btn_conductor = ({ data }) => {
	const { name, phone, busId,timetableId } = data;
	//Contextos

	//States

	//******************  Contenido  **************** //
	return (
		<>
			<div className={styles.container}>
				<div className={styles.btn}>
					<div className={styles.container__imagen}>
						<div className={styles.imagen}>
							<Image
								src={"/User_icon.png"} //Heredar
								height={600}
								width={600}
								alt="Imagen de perfil"
							/>
						</div>
					</div>

					<div className={styles.text}>
						<h2>{name}</h2> {/* Heredar*/}
						<p>Teléfono: {phone} </p>
						{/* Heredar*/}
						<p>Horario: {timetableId} </p>
						{/* Heredar*/}
						<p>Unidad: {`Numero "${busId.num}" - Placa "${busId.placa}"`}</p>
						{/* Heredar*/}
					</div>
				</div>
			</div>
		</>
	);
};

export default Btn_conductor;
