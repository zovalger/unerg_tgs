import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";

import style from "@/styles/Routes/routes_view.module.css";
import styleForm from "@/styles/Edit/edit.module.css";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import MapContext from "@/contexts/Map.context";

//Retocar
export default function WaypointForm({ onSubmit, data }) {
	const { getCenterMap, setCenterMap } = useContext(MapContext);

	useEffect(() => {
		let interval = null;

		if (data)
			setTimeout(() => {
				setCenterMap(data.coord, 15);
			}, 250);

		interval = setInterval(() => {
			const c = getCenterMap();
			if (c)
				if (
					formik.values.coord.lat != c.lat ||
					formik.values.coord.lng != c.lng
				)
					formik.setFieldValue("coord", c);
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const formik = useFormik({
		initialValues: data || {
			name: "",
			description: "",
			coord: { lat: 0, lng: 0 },
			type: "p",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("El nombre es obligatorio")
				.min(3, "El nombre es muy corto"),
			description: Yup.string(),
		}),
		onSubmit,
	});

	const onChangeType = (type) => {
		console.log(type);
		formik.setFieldValue("type", type);
	};

	return (
		<>
			<div className={style.container_routes}>
				<h2>Nueva Parada</h2>

				<div className={styleForm.container__form}>
					<Form className="container-xl">
						<FormGroup>
							<Label className={styleForm.label} for="name">
								Nombre de la parada
							</Label>
							<Input
								className={styleForm.input}
								id="name"
								name="name"
								onChange={formik.handleChange}
								value={formik.values.name}
								placeholder="Nombre de la parada"
								type="text"
								invalid={!!formik.errors.name}
							/>
							<FormFeedback>{formik.errors.name}</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label className={styleForm.label} for="description">
								Descripcion
							</Label>
							<Input
								className={styleForm.input}
								id="description"
								name="description"
								onChange={formik.handleChange}
								value={formik.values.description}
								placeholder=""
								type="textarea"
								invalid={!!formik.errors.description}
							/>
							<FormFeedback>{formik.errors.description}</FormFeedback>
						</FormGroup>

						<FormGroup>
							<h4 className={styleForm.label}>Coordenadas</h4>

							<div>latitud: {formik.values.coord.lat.toFixed(4)}</div>
							<div>longitud: {formik.values.coord.lng.toFixed(4)}</div>
						</FormGroup>

						<h4 className={styleForm.label}>Tipo</h4>
						<FormGroup check>
							<Input
								name="type"
								type="radio"
								id="parada"
								defaultChecked
								onChange={() => onChangeType("p")}
							/>
							<Label check for="parada">
								Parada
							</Label>
						</FormGroup>
						<FormGroup check className="mb-3">
							<Input
								name="type"
								type="radio"
								id="control_point"
								onChange={() => onChangeType("c")}
							/>
							<Label check for="control_point">
								Punto de Control
							</Label>
						</FormGroup>
						<Button
							className={`${styleForm.button} w-100`}
							type="button"
							color="primary"
							onClick={formik.submitForm}
						>
							Guardar
						</Button>
					</Form>
				</div>
			</div>
		</>
	);
}
