// React/Next
import { useContext, useState, useEffect } from "react";
import Link from "next/link";

//Componentes
import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";
import { BiPencil } from "react-icons/bi";

//Estilos
import style from "../../styles/Edit/edit.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import RutaContext from "@/contexts/Ruta.context";
import { v4 as uuid } from "uuid";

//Retocar
export default function RutaForm({ data, onSubmit }) {
	const [state, setState] = useState(true);
	const { editingRoute, setEditingRoute } = useContext(RutaContext);

	const formik = useFormik({
		initialValues: data || {
			name: "",
			description: "",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("El nombre es obligatorio")
				.min(3, "El nombre es muy corto"),
			description: Yup.string(),
		}),
		onSubmit,
	});

	const onChange = ({ target: { name, value } }) => {
		formik.setFieldValue(name, value);
		setEditingRoute({ ...formik.values, [name]: value });
	};

	return (
		<>
			<div className={style.container_AddRuta}>
				<div className={style.container__form}>
					<Form className="container-xl">
						<FormGroup>
							<Label className={style.label} for="name">
								Nombre de la Ruta
							</Label>
							<Input
								// className={style.input}
								id="name"
								name="name"
								placeholder="Nombre de la Ruta"
								onChange={onChange}
								value={formik.values.name}
								invalid={!!formik.errors.name}
							/>
							<FormFeedback>{formik.errors.name}</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label className={style.label} for="description">
								Descripción
							</Label>
							<Input
								id="description"
								name="description"
								placeholder="Descripción"
								onChange={onChange}
								value={formik.values.description}
								invalid={!!formik.errors.description}
							/>
							<FormFeedback>{formik.errors.description}</FormFeedback>

							{/*Modificar*/}
							<Label className={style.label} for="bus">
								Autobuses asignados
							</Label>
							<Input id="bus" name="bus" type="select" />

							<Label className={style.label} for="active_hours">
								Horario
							</Label>
							<div className={style.container_hours}>
								<div className={style.hours}>
									<p>Hora de inicio</p>
									<Input
										className={style.input}
										id="start_hours"
										name="start_hours"
										type="time"
									/>
								</div>

								<div className={style.hours}>
									<p>Hora de Fin</p>
									<Input
										className={style.input}
										id="end_hours"
										name="end_hours"
										type="time"
									/>
								</div>
							</div>
							{/*Modificar*/}
							<Label className={style.label} for="parada">
								Paradas
							</Label>
							{/*  <Input
                    className={style.input}
                    id="parada"
                    name="parada"
                    type="select"
                    />*/}
						</FormGroup>

						<div className={style.Rutas__addParada}>
							<p>Editar Paradas</p>
							<Link
								href={"./waypoints/"}
								className={`${style.add} ${style.add__rutas}`}
							>
								<BiPencil />
							</Link>
						</div>

						{editingRoute?.waypoints?.map((w) => (
							<div key={uuid()}>{w.name}</div>
						))}

						<FormGroup switch style={{ padding: 0 }}>
							<Label className={style.label} for="state">
								Estado de la Ruta
							</Label>
							<div className={style.container_check}>
								<div className={style.text}>
									{state ? <p>Activado</p> : <p>Desactivado</p>}
								</div>

								<Input
									className={style.input}
									id="state"
									name="state"
									type="switch"
									checked={state}
									defaultChecked
									onChange={() => {
										setState(!state);
									}}
								/>
							</div>
						</FormGroup>

						<Button
							className={style.button}
							type="button"
							onClick={() => formik.submitForm()}
						>
							Guardar
						</Button>
					</Form>
				</div>
			</div>
		</>
	);
}
