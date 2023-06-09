//React/Next

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { createBus_Request } from "@/api/bus.api";
import BusForm from "@/components/BusView/BusForm";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import BusContext from "@/contexts/Bus.context";

//*********************************  Codigo  **************************//
const AddBuss = () => {
	const router = useRouter();
	//useState

	const [isSubmiting, setIsSubmitin] = useState(false);

	const { insert } = useContext(BusContext);

	const onSubmit = async (formData) => {
		console.log(formData);
		if (isSubmiting) return;
		setIsSubmitin(true);

		try {
			const res = await createBus_Request(formData);
			console.log(res);

			const b = res.data;
			insert(b);

			router.replace(`./menu`);
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

			<BusForm onSubmit={onSubmit} />
		</Layout>
	);
};

export default AddBuss;
