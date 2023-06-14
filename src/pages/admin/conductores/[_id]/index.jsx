//React/Next
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styles from "@/styles/Users/admin/Conductores/add.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";
import DriverForm from "@/components/AddConductor/DriverForm";
import ToastContext from "@/contexts/Toast.context";
import { useRouter } from "next/router";
import { getDriver_By_Id_Request, updateDriver_Request } from "@/api/userDriver.api";

import { getAllBuses_Request } from "@/api/bus.api";
import { getAllTimetables_Request } from "@/api/timetable.api";

//Contextos

//******************************* Codigo*****************************//
const Add = () => {
	const router = useRouter();
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const { _id } = router.query;

	const [data, setData] = useState(null);
	const [buses, setBuses] = useState([]);
	const [timetables, setTimetables] = useState([]);

	useEffect(() => {
		if (_id)
			getDriver_By_Id_Request(_id)
				.then(({ data: ad }) => setData(ad))
				.catch((error) => console.log(error));
	}, [_id]);

	useEffect(() => {
		getAllBuses_Request()
			.then(({ data }) => setBuses(data))
			.catch((error) => console.log(error));

		getAllTimetables_Request()
			.then(({ data }) => setTimetables(data))
			.catch((error) => console.log(error));
	}, []);

	const onSubmit = async (formdata) => {
		withLoadingSuccessAndErrorFuntionsToast(
			updateDriver_Request(data._id, formdata),
			(res) => {
				console.log(res.data);
				router.replace("./menu");

				return "Guardado";
			},
			(error) => {
				return error.message;
			}
		);
	};

	return (
		<Layout>
			<NavBar
				left={
					<>
						<div>
							<Link href={"./menu"} replace className={styleN.btn_return}>
								<IoIosArrowBack />
							</Link>
						</div>
						<div className={styleN.title_nav}>
							<h2>Conductores</h2>
						</div>
					</>
				}
				right={<></>}
			/>

			{/********************************  Input para Imagen de Perfil *********************************/}

			<div className={styles.container}>
				{data && (
					<DriverForm
						data={data}
						onSubmit={onSubmit}
						buses={buses}
						timetables={timetables}
					/>
				)}
			</div>
		</Layout>
	);
};

export default Add;
