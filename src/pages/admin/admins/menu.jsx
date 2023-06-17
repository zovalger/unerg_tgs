//React-Next
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
import Btn_admin from "@/components/AddAdmin/Btn_admin";

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
import { useRouter } from "next/router";
import AsidePanel from "@/components/common/AsidePanel";
import { getAllAdmins_Request } from "@/api/userAdmin.api";

//*************************** Codigo  ************************/

const MenuAdmin = () => {
	//useContext
	const router = useRouter();
	const { logout, user } = useContext(UserContext);

	const [admins, setAdmins] = useState([]);

	useEffect(() => {
		getAllAdmins_Request()
			.then(({ data }) => setAdmins(data))
			.catch((error) => console.log(error));
	}, []);

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
					title={"Administradores"}
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
						{admins &&
							admins.map((a) => (
								<Btn_admin key={a._id} data={a} onClick={onClick} />
							))}
					</div>
				</div>
			</div>

			{/* panel lateral desplegable */}

			<AsidePanel
				toggleOffcanvas={toggleOffcanvas}
				offcanvasActive={offcanvasActive}
				location={false}
			/>
		</Layout>
	);
};

export default MenuAdmin;
