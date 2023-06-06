//React-Next
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

//Componentes
import {
	Form,
	FormGroup,
	Input,
	Button,
	Offcanvas,
	OffcanvasBody,
	OffcanvasHeader,
} from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import Btn_conductor from "@/components/AddConductor/Btn_conductor";
import AsidePanel from "@/components/common/AsidePanel";

import { FaSearch, FaBusAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiBusStop } from "react-icons/gi";
import { IoIosLogOut, IoIosAdd } from "react-icons/io";
import { GrReturn } from "react-icons/gr";

//Estilos
import style from "@/styles/Bus/menu.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import UserContext from "@/contexts/User.context";
import dbConnect from "@/lib/db";
import { getAllUserDriver_service } from "@/services/userDriver.service";



//*************************** Codigo  ************************/

const MenuConductor = ({ drivers }) => {
	const router = useRouter();

	//useContext

	const { logout, user } = useContext(UserContext);

	//useState

	//Menu desplegable del nav
	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	//Buscador
	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Término de búsqueda:", searchTerm);
	};

	const onClick = (_id) => {
		router.push(`./${_id}`);
	};

	return (
		<Layout>
			<div className={style.container}>
				<NavBar
					title={"Conductores"}
					ViPrincipal={true}
					left={
						<div onClick={toggleOffcanvas} className={styleN.HamburgerMenu}>
							<RxHamburgerMenu />
						</div>
					}
					right={
						<>
							<Link className={style.btn_add} href={"./add"}>
								<IoIosAdd />
							</Link>
						</>
					}
				/>

				<div className="container mt-3">
					<Form inline onSubmit={handleSubmit}>
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<div className="input-group">
								<Input
									type="text"
									name="searchTerm"
									id="searchTerm"
									placeholder="Buscar..."
									value={searchTerm}
									onChange={handleInputChange}
								/>
								<div className="input-group-append">
									<Button type="submit" color="primary">
										<FaSearch />
									</Button>
								</div>
							</div>
						</FormGroup>
					</Form>
					<div>
						{drivers &&
							drivers.map((d) => (
								<Btn_conductor key={d._id} data={d} onClick={onClick} />
							))}
					</div>
				</div>
			</div>

			{/* panel lateral desplegable */}
			<AsidePanel
					toggleOffcanvas={toggleOffcanvas}
					offcanvasActive={offcanvasActive}
					location = {false}
				/>
		</Layout>
	);
};

export default MenuConductor;

export const getServerSideProps = async (context) => {
	await dbConnect();

	const data = await getAllUserDriver_service();

	console.log(data);

	console.log();

	const drivers = JSON.parse(JSON.stringify(data));

	return {
		props: { drivers },
	};
};
