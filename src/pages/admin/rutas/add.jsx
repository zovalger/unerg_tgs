//React-Next
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import Add_ruta from "@/components/forms/Add_ruta";

//Estilos
import styleN from "../../../styles/Nav/NavStyle.module.css";
import RutaContext from "@/contexts/Ruta.context";
import { createRuta_Request } from "@/api/ruta.api";

//Contextos

const MainMap = () => {
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
								<h2>Agregar parada</h2>
							</div>
						</>
					}
					right={<></>}
				/>

				<div>
					<Add_ruta data={editingRoute} onSubmit={onSubmit} />
				</div>
			</div>
		</Layout>
	);
};

export default MainMap;
