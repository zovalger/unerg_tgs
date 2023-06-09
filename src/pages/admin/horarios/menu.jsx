//React-Next
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";

//Estilos
import style from "@/styles/Bus/menu.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import { useRouter } from "next/router";
import AsidePanel from "@/components/common/AsidePanel";
import { getAllTimetables_Request } from "@/api/timetable.api";
import ToastContext from "@/contexts/Toast.context";
import TimetableItemList from "@/components/TimetableView/TimetableItemList";

const MenuBus = () => {
	const { withLoadingToast } = useContext(ToastContext);
	const router = useRouter();
	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	const [list, setList] = useState([]);

	const onClickItem = (_id) => {
		router.push(`./${_id}`);
	};

	useEffect(() => {
		withLoadingToast(getData());
	}, []);

	const getData = async () => {
		try {
			const { data } = await getAllTimetables_Request();
			setList(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<div className={style.container}>
				<NavBar
					title={"Horarios"}
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
					{/* <Form inline onSubmit={handleSubmit}>
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<InputGroup>
								<Input
									type="text"
									name="searchTerm"
									id="searchTerm"
									placeholder="Buscar..."
									value={searchTerm}
									onChange={handleInputChange}
								/>

								<Button type="submit" color="primary">
									<FaSearch />
								</Button>
							</InputGroup>
						</FormGroup>
					</Form> */}

					{list.map((i) => {
						return (
							<TimetableItemList
								data={i}
								key={i._id}
								onClick={onClickItem}
							/>
						);
					})}
				</div>
			</div>

			{/* panel lateral desplegable */}
			<AsidePanel
				toggleOffcanvas={toggleOffcanvas}
				offcanvasActive={offcanvasActive}
			/>
		</Layout>
	);
};

export default MenuBus;
