//React/Next
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

//Componentes
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos
import styleN from "../../../styles/Nav/NavStyle.module.css";
import BusForm from "@/components/BusView/BusForm";


import { createBus_Request, updateBus_Request } from "@/api/bus.api";
import BusContext from "@/contexts/Bus.context";

const AddBuss = () => {
	const router = useRouter();
	const { _id } = router.query;

	const [isSubmiting, setIsSubmitin] = useState(false);

	const { updateBus, getBus } = useContext(BusContext);

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
			updateBus(b);

			router.back();
		} catch (error) {
			console.log(error);
			setIsSubmitin(false);
		}
	};

	return (
		<Layout>
			<NavBar
				left={
					<>
						<div>
							<Link href={"./menu"} className={styleN.btn_return}>
								<IoIosArrowBack />
							</Link>
						</div>
						<div className={styleN.title_nav}>
							<h2>Autobuses</h2>
						</div>
					</>
				}
				right={<></>}
			/>

			<BusForm onSubmit={onSubmit} data={formateToFormBus(getBus(_id))} />
		</Layout>
	);
};

export default AddBuss;
