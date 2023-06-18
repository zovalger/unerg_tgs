import Link from "next/link";
import { useState } from "react";
import { useContext } from "react";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";
import styles from "@/styles/Users/driver/capacidad.module.css";

//Componentes

import Layout from "@/layouts/Layout";

import { Range, Direction } from "react-range";

import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";


//Contextos

import DriverContext from "@/contexts/Driver.context";
import UserContext from "@/contexts/User.context";
import BusContext from "@/contexts/Bus.context";
import AsidePanel from "@/components/common/AsidePanel";
import { FaBusinessTime } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";


//****************************** Codigo *****************************//

const Capacidad = () => {
	const { sendCapacity_by_socket } = useContext(DriverContext);
	const { user } = useContext(UserContext);
	const { getBus } = useContext(BusContext);

	// todo: que no pueda modificar/enviar si no esta en servicio
	const onFinalChange = (value) => {
		console.log("enviado capacidad de", value);
		sendCapacity_by_socket(value);
	};

	//useState
	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	return (
		<Layout>
<<<<<<< HEAD
				
			<NavBar
		
				Fixed={true}
				left={
					<div>
					<Link href={"./map"} className={styleN.btn_return}>
					<IoIosArrowBack />
						</Link>
					</div>
				}
				title={"Capacidad del bus"}
				right={
					<>
				
					</>
				}
			/>
		
=======
			<Navbar fixed="top">
				<div>
				<div onClick={toggleOffcanvas}>
							<RxHamburgerMenu />
						</div>
				</div>
				<h2 className={styles.title}>Capacidad del bus</h2>
			</Navbar>
>>>>>>> 371747e439365c860fa602e5c48803f8c4eee74c

			<div className={styles.container}>
				<SuperSimple
					value={user && getBus(user.busId)}
					onFinalChange={onFinalChange}
				/>
			</div>

			<AsidePanel
					toggleOffcanvas={toggleOffcanvas}
					offcanvasActive={offcanvasActive}
				>
					<button
						className={styleN.btn_nav}
						onClick={() =>
							user && !user.inService
								? startServiceDriver()
								: endServiceDriver()
						}
					>
						<FaBusinessTime className={styleN.route} />
						<p>
							{user && !user.inService
								? "Iniciar servicio"
								: "Detener servicio"}{" "}
						</p>
					</button>
				</AsidePanel>
		</Layout>
	);
};

export default Capacidad;

const SuperSimple = ({ value, onFinalChange }) => {
	// todo: retomar el valor que tiene la DB
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
					{...props}
					style={{
						...props.style,
						height: "100%",
						width: "100%",
					}}
				>
					{children}
					<h2 className={styles.porcentaje}>{values}%</h2>
					<div
						className={styles.barra}
						style={{
							height: `${values}%`,
							borderTopLeftRadius: `${values == 100 ? 0 : 20}px`,
							borderTopRightRadius: `${values == 100 ? 0 : 20}px`,
						}}
					></div>
				</div>
			)}
			renderThumb={({ props }) => (
				<div
					{...props}
					style={{
						...props.style,
					}}
				/>
			)}
		/>
	);
};
