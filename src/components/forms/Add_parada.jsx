import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";

import style from "../../styles/Routes/routes_view.module.css";
import styleForm from "../../styles/Edit/edit.module.css";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import MapContext from "@/contexts/Map.context";

//Retocar
export default function Add_parada({ onSubmit }) {
	const { getCenterMap } = useContext(MapContext);

	const [center, setCenter] = useState(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const c = getCenterMap();
			if (c) if (center.lat != c.lat || center.lng != c.lng) setCenter(c);
		}, 300);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			coord: { lat: null, lng: null },
			type: "p",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("El nombre es obligatorio")
				.min(
					7,
					"El nombre es muy corto, Intente colocando también el apellido"
				),
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
							<Label className={styleForm.label} for="new_parada">
								Nombre de la parada
							</Label>
							<Input
								className={styleForm.input}
								id="new_parada"
								name="new_parada"
								placeholder="Nombre de la parada"
								type="text"
							/>
						</FormGroup>
						<h4>coordenadas</h4>

						<div>latitud: {center.lat}</div>
						<div>longitud: {center.lng}</div>

						<h4>Tipo</h4>
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
