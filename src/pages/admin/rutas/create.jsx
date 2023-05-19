//React-Next
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import RutaForm from "@/components/RouteView/RutaForm";

//Estilos
import styleN from "../../../styles/Nav/NavStyle.module.css";
import RutaContext from "@/contexts/Ruta.context";
import { createRuta_Request } from "@/api/ruta.api";
import { useRouter } from "next/router";

//Contextos

const MainMap = () => {

	const router=
	useRouter()
	//useContext
	const { editingRoute, insertRuta } = useContext(RutaContext);

	//useState
	const [isSubmiting, setIsSubmitin] = useState(false);

	const onSubmit = async (formData) => {
		if (isSubmiting) return;
		setIsSubmitin(true);
		console.log(formData);

		try {
			formData.waypoints = formData.waypoints.map((w) => (w._id ? w._id : w));
			const res = await createRuta_Request(formData);

			insertRuta(res.data);

			router.push("./menu")

		} catch (error) {
			setIsSubmitin(false);

			console.log(error);
		}
	};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link href={"./menu"} className={styleN.btn_return}>
									<IoIosArrowBack />
								</Link>
							</div>
							<div className={styleN.title_nav}>
								<h2>Agregar Ruta</h2>
							</div>
						</>
					}
					right={<></>}
				/>

				<div>
					<RutaForm data={editingRoute} onSubmit={onSubmit} />
				</div>
			</div>
		</Layout>
	);
};

export default MainMap;
