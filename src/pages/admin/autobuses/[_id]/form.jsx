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
import BusForm from "@/components/BusView/BusForm";

import {
	createBus_Request,
	getBus_By_Id_Request,
	updateBus_Request,
} from "@/api/bus.api";
import BusContext from "@/contexts/Bus.context";
import RutaContext from "@/contexts/Ruta.context";

const AddBuss = () => {
	const router = useRouter();
	const { _id } = router.query;

	const [isSubmiting, setIsSubmitin] = useState(false);

	const { updateBus, getBus, buses } = useContext(BusContext);
	const { getRuta } = useContext(RutaContext);

	const formateToFormBus = (bus) => {
		if (!bus) return;
		if (!bus.ruta) return bus;
		const b = { ...bus, ruta: bus.ruta._id };
		return b;
	};

	//useState

	const onSubmit = async (formData) => {
		console.log(formData);
		if (isSubmiting) return;
		setIsSubmitin(true);

		try {
			const res = await updateBus_Request(_id, formData);
			console.log(res);

			const b = res.data;
			updateBus(b._id, b, buses);

			router.replace(`../${_id}`);
		} catch (error) {
			console.log(error);
			setIsSubmitin(false);
		}
	};

	const [bus, setBus] = useState(null);

	useEffect(() => {
		if (!_id) return;

		getBus_By_Id_Request(_id).then(({ data }) => {
			const ruta = getRuta(data.ruta);
			if (!ruta) router.push(`../${_id}`);
			setBus({ ...data, ruta });
		});
	}, [_id]);

	return (
		<Layout>
			<NavBar
				left={
					<>
						<div>
							<Link href={`../${_id}`} className={styleN.btn_return}>
								<IoIosArrowBack />
							</Link>
						</div>
						<div className={styleN.title_nav}>
							{bus && <h2>Bus {bus.num}</h2>}
						</div>
					</>
				}
				right={<></>}
			/>
			{bus && <BusForm onSubmit={onSubmit} data={formateToFormBus(bus)} />}
		</Layout>
	);
};

export default AddBuss;
