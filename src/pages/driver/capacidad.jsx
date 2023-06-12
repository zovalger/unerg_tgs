import Link from "next/link";
import { useState } from "react";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";
import styles from "@/styles/Users/driver/capacidad.module.css";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { Range, Direction } from "react-range";
import { Form } from "reactstrap";

import { IoIosArrowBack } from "react-icons/io";
import DriverContext from "@/contexts/Driver.context";
import { useContext } from "react";
import UserContext from "@/contexts/User.context";
import BusContext from "@/contexts/Bus.context";

//Contextos

//****************************** Codigo *****************************//

const Capacidad = () => {
	const { sendCapacity_by_socket } = useContext(DriverContext);
	const { user } = useContext(UserContext);
	const { getBus } = useContext(BusContext);

	const onFinalChange = (value) => {
		console.log("enviado capacidad de", value);
		sendCapacity_by_socket(value);
	};

	return (
		<Layout>
			<NavBar
				title={"Capacidad del bus"}
				ViPrincipal={true}
				left={
					<div>
						<Link href={"./map"} className={styleN.btn_return}>
							<IoIosArrowBack />
						</Link>
					</div>
				}
				right={<></>}
			/>

			<div className={styles.container}>
				<Form className={styles.form}>
					<SuperSimple
						value={user && getBus(user.busId)}
						onFinalChange={onFinalChange}
					/>
				</Form>
			</div>
		</Layout>
	);
};

export default Capacidad;

const SuperSimple = ({ value, onFinalChange }) => {
	const [values, setValues] = useState([typeof value === "number" ? value : 0]);

	return (
		<Range
			step={1}
			min={0}
			max={100}
			values={values}
			direction={Direction.Up}
			onChange={(v) => setValues(v)}
			onFinalChange={(v) => onFinalChange(v[0])}
			renderTrack={({ props, children }) => (
				<div
					className={styles.barra}
					{...props}
					style={{
						...props.style,
						height: `${100}%`,
						transition: "height 0.1s ease-in-out",
					}}
				>
					{children}
					<h2 className={styles.porcentaje}>{values}%</h2>
				</div>
			)}
			renderThumb={({ props }) => (
				<div
					className={styles.boton}
					{...props}
					style={{
						...props.style,
					}}
				/>
			)}
		/>
	);
};
