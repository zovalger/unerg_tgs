//React-Next
import { useEffect, useState } from "react";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { RxHamburgerMenu } from "react-icons/rx";

//Estilos
import style from "@/styles/Bus/menu.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import { Form } from "reactstrap";

import { useRouter } from "next/router";
import AsidePanel from "@/components/common/AsidePanel";
import { getStadisticIndexation_Request } from "@/api/stadistic.api";
import { Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import ItemNumber from "@/components/StadisticView/ItemNumber";
import { useFormik } from "formik";
import * as Yup from "yup";

//*************************** Codigo  ************************/

const Stadistics = () => {
	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);
	//useContext
	const router = useRouter();

	const [indexation, setIndexation] = useState(null);

	useEffect(() => {
		getStadisticIndexation_Request().then(({ data }) => setIndexation(data));
	}, []);

	// socket de stadisticas
	useEffect(() => {}, []);

	//useState

	//Menu desplegable del nav

	const formik = useFormik({
		initialValues: {
			by: "",
			item: "",
		},
		validationSchema: Yup.object({}),
		onSubmit: () => {
			console.log("aplicar consulta");
		},
	});

	return (
		<Layout>
			<div className={style.container}>
				<NavBar
					title={"Estadisticas"}
					ViPrincipal={true}
					left={
						<div onClick={toggleOffcanvas} className={styleN.HamburgerMenu}>
							<RxHamburgerMenu />
						</div>
					}
				/>
				{indexation && (
					<div className="container mt-3">
						<Row>
							<Col xs={12}>
								<ItemNumber
									title={"Conexiones abiertas en el servidor"}
									num={indexation.usersCount.length}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Administradores"}
									num={indexation.admins.count}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Conexiones de Administradores"}
									num={
										indexation.usersCount.filter(
											(item) => item.role == "admin" || item.role == "root"
										).length
									}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Conductores"}
									num={indexation.drivers.count}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Conexiones de Conductores"}
									num={
										indexation.usersCount.filter(
											(item) => item.role == "driver"
										).length
									}
								/>
							</Col>
						</Row>

						<h4>Vueltas</h4>
						<Form>
							<FormGroup>
								<Label for="by">Consultar Por</Label>
								<Input
									className={style.input}
									type="select"
									name="by"
									id="by"
									placeholder="Escriba aquí"
									value={formik.values.by}
									onChange={formik.handleChange}
									invalid={!!formik.errors.by}
								>
									<option value="rutas">Rutas</option>
									<option value="timetables">Horarios</option>
									<option value="drivers">Conductores</option>
									<option value="buses">Buses</option>
								</Input>
								<FormFeedback>{formik.errors.by}</FormFeedback>
							</FormGroup>

							<FormGroup>
								<Label for="item">Consultar Por</Label>
								<Input
									className={style.input}
									type="select"
									name="item"
									id="item"
									placeholder="Escriba aquí"
									value={formik.values.item}
									onChange={formik.handleChange}
									invalid={!!formik.errors.item}
								>
									<option value="">Opcion</option>
{/* 
									{(() => {
										let a = [];
										for (const key in indexation[formik.values.by]) {
											if (Object.hasOwnProperty.call(object, key)) {
												const element = indexation[formik.values.by][key];
												a.push(element);
											}
										}

										return a;
									})()} */}
								</Input>
								<FormFeedback>{formik.errors.item}</FormFeedback>
							</FormGroup>
						</Form>
						{indexation.busTravels.map((item) => item.startDate)}
						<div>datos</div>
					</div>
				)}
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

export default Stadistics;
