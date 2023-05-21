//React-Next
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import RutaForm from "@/components/RouteView/RutaForm";

//Estilos
import styleN from "../../../../styles/Nav/NavStyle.module.css";
import RutaContext from "@/contexts/Ruta.context";
import { createRuta_Request, updateRuta_Request } from "@/api/ruta.api";
import { useRouter } from "next/router";

//Contextos

const MainMap = () => {
	const router = useRouter();
	const { _id } = router.query;
	//useContext
	const { editingRoute, insertRuta } = useContext(RutaContext);

	useEffect(() => {
		if (!editingRoute) router.push("/admin/rutas/menu");
	}, []);

	//useState
	const [isSubmiting, setIsSubmitin] = useState(false);

	const onSubmit = async () => {
		if (isSubmiting) return;
		setIsSubmitin(true);
		const formData = editingRoute;

		console.log(formData);

		try {
			formData.waypoints = formData.waypoints.map((w) => (w._id ? w._id : w));
			const res = await updateRuta_Request(_id, formData);

			insertRuta(res.data);
			restore();
			router.push("./menu");
		} catch (error) {
			setIsSubmitin(false);
			console.log(error);
		}
	};

	const restore = () => {
		setEditingRoute(null);
		clearWaypoint();
		clearRutas();
	};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link
									href={`../${_id}`}
									className={styleN.btn_return}
									onClick={restore}
								>
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
					<RutaForm
						data={editingRoute}
						onSubmit={onSubmit}
						path={`../${_id}`}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default MainMap;

// https://www.figma.com/proto/v8Jrdn88Q9UOcHnbaBpIco/unerg-tgs?type=design&node-id=244-492&scaling=scale-down&page-id=106%3A261&starting-point-node-id=127%3A273&show-proto-sidebar=1
