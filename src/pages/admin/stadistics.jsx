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
import moment from "moment";
import BusTravelItem from "@/components/StadisticView/BusTravelItem";

//*************************** Codigo  ************************/

const Stadistics = () => {
	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);
	//useContext
	const router = useRouter();

	const [stadisticData, setStadisticData] = useState(null);
	const [indexation, setIndexation] = useState(null);

	useEffect(() => {
		getStadisticIndexation_Request().then(({ data }) => {
			const i = {
				buses: {},
				averias: {},
				rutas: {},
				timetables: {},
				admins: {},
				drivers: {},
				waypoints: {},
			};

			for (const element of data.buses) {
				i.buses[element._id] = element;
			}
			for (const element of data.averias) {
				i.averias[element._id] = element;
			}

			for (const element of data.rutas) {
				i.rutas[element._id] = element;
			}
			for (const element of data.timetables) {
				i.timetables[element._id] = element;
			}
			for (const element of data.admins) {
				i.admins[element._id] = element;
			}
			for (const element of data.drivers) {
				i.drivers[element._id] = element;
			}
			for (const element of data.waypoints) {
				i.waypoints[element._id] = element;
			}

			setIndexation(i);
			setStadisticData(data);
		});
	}, []);

	// socket de stadisticas
	useEffect(() => {}, []);

	//useState

	//Menu desplegable del nav

	const formik = useFormik({
		initialValues: {
			by: "rutas",
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
				{stadisticData && (
					<div className="container mt-3">
						<Row>
							<Col xs={12}>
								<ItemNumber
									title={"Conexiones abiertas en el servidor"}
									num={stadisticData.usersCount.length}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Administradores"}
									num={stadisticData.admins.length}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Conexiones de Administradores"}
									num={
										stadisticData.usersCount.filter(
											(item) => item.role == "admin" || item.role == "root"
										).length
									}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Conductores"}
									num={stadisticData.drivers.length}
								/>
							</Col>
							<Col xs={6}>
								<ItemNumber
									title={"Conexiones de Conductores"}
									num={
										stadisticData.usersCount.filter(
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

									{stadisticData[formik.values.by].map((item) => {
										if (formik.values.by === "rutas")
											return (
												<option value={item._id} key={item._id}>
													{item.name}
												</option>
											);

										if (formik.values.by === "timetables")
											return (
												<option value={item._id} key={item._id}>
													{`${item.name}: ${moment(item.startTime).format(
														"h:mm a"
													)} - ${moment(item.endTime).format("h:mm a")}`}
												</option>
											);
										if (formik.values.by === "drivers")
											return (
												<option value={item._id} key={item._id}>
													{item.name} CI: {item.CI}
												</option>
											);

										if (formik.values.by === "buses")
											return (
												<option value={item._id} key={item._id}>
													{`Numero: ${item.num} - Placa: ${item.placa}`}
												</option>
											);
									})}
								</Input>
								<FormFeedback>{formik.errors.item}</FormFeedback>
							</FormGroup>
						</Form>

						{(() => {
							const items = stadisticData.busTravels.filter((item) => {
								if (formik.values.by === "rutas")
									return item.ruta == formik.values.item;
								if (formik.values.by === "timetables")
									return (
										item.timetableDriver == formik.values.item ||
										item.timetableRuta == formik.values.item
									);
								if (formik.values.by === "drivers")
									return item.driver == formik.values.item;
								if (formik.values.by === "buses")
									return item.bus == formik.values.item;
							});

							return (
								<>
									<div>cantidad {items.length}</div>

									
									{items.map((item) => (
										<BusTravelItem
											data={item}
											key={item._id}
											indexation={indexation}
										/>
									))}
								</>
							);
						})()}

						<div style={{ minHeight: "50vh" }}></div>
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
