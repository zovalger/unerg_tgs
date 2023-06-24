//React/Next
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

//Componentes
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos
import styleN from "@/styles/Nav/NavStyle.module.css";
import style from "@/styles/Bus/menu.module.css";

import BusForm from "@/components/BusView/BusForm";

import {
	createBusAveria_Request,
	createBus_Request,
	getAllBusAveria_Request,
	getBus_By_Id_Request,
	updateBus_Request,
} from "@/api/bus.api";
import BusContext from "@/contexts/Bus.context";
import RutaContext from "@/contexts/Ruta.context";
import { BiPencil } from "react-icons/bi";
import BusItemList from "@/components/BusView/BusItemList";
import BusAveriaForm from "@/components/BusView/BusAveriaForm";
import ToastContext from "@/contexts/Toast.context";
import BusAveriaItemList from "@/components/BusView/BusAveriaItemList";

const AddBuss = () => {
	const router = useRouter();
	const { _id } = router.query;

	const { updateBus, getBus } = useContext(BusContext);
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);
	const { getRuta } = useContext(RutaContext);

	const [bus, setBus] = useState(null);
	// const [a, setBus] = useState(null);
	const [averias, setAverias] = useState(null);

	useEffect(() => {
		if (!_id) return;

		getBus_By_Id_Request(_id).then(({ data }) =>
			setBus({ ...data, ruta: getRuta(data.ruta) })
		);
		getAllBusAveria_Request(_id).then(({ data }) => setAverias(data));
	}, [_id]);

	//useState

	return (
		<Layout>
			<div className={style.container}>
				<NavBar
					left={
						<>
							<div>
								<Link href={"./menu"} className={styleN.btn_return}>
									<IoIosArrowBack />
								</Link>
							</div>
							<div className={styleN.title_nav}>
								{bus && <h2>Bus {bus.num}</h2>}
							</div>
						</>
					}
					right={
						<>
							<div
								className={styleN.btn_edit}
								onClick={() => {
									router.push(`./${_id}/form`);
								}}
							>
								<BiPencil />
							</div>
						</>
					}
				/>
				<div className="container mt-3">
					{bus && (
						<>
							<BusItemList data={bus} key={bus._id} onClick={() => {}} />

							{averias && (
								<>
									<h4 className="mt-3">Añadir de averías</h4>

									<BusAveriaForm
										onSubmit={(formData) => {
											withLoadingSuccessAndErrorFuntionsToast(
												createBusAveria_Request(_id, formData),
												({ data }) => {
													setAverias([data, ...averias]);
													return "Guardado";
												},
												(error) => "Error la guardar"
											);
										}}
									/>

									<h4 className="mt-3">Historial de averías</h4>
									{averias.map((item) => (
										<BusAveriaItemList key={item._id} data={item} />
									))}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default AddBuss;
