//Estilos
import style from "@/styles/Bus/add.module.css";

//React/Next
import Link from "next/link";

//Componentes
import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	FormFeedback,
} from "reactstrap";

import RutaContext from "@/contexts/Ruta.context";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";

import * as Yup from "yup";
import { getAllNums_Request, getAllPlacas_Request } from "@/api/bus.api";

const BusForm = ({ onSubmit, data }) => {
	const { rutas } = useContext(RutaContext);
	const [numberRegisted, setNumberRegisted] = useState([]);
	const [placasRegisted, setPlacasRegisted] = useState([]);

	useEffect(() => {
		getAllPlacas_Request()
			.then((res) => setPlacasRegisted(res.data))
			.catch((error) => console.log(error));
		getAllNums_Request()
			.then((res) => setNumberRegisted(res.data))
			.catch((error) => console.log(error));
	}, []);

	const formik = useFormik({
		initialValues: data || {
			num: "",
			placa: "",
			ruta: null,
		},
		validationSchema: Yup.object({
			placa: Yup.string()
				.required("La placa es obligatoria")
				.trim()
				.uppercase("en mayuscula")
				.test("placa", "Ya esta placa esta registrado en otro bus", (value) => {
					let notHasOther = true;

					console.log(value);

					placasRegisted.map(({ _id: _idRegisted, placa }) => {
						if (value == placa)
							if (_idRegisted != data?._id) notHasOther = false;
					});

					return notHasOther;
				}),

			num: Yup.number()
				.integer("no es un entero")
				.required("El numero de bus es obligatorio")
				.round("trunc")
				.min(1, "")
				.test("num", "Ya ese numero esta registrado en otro bus", (value) => {
					let notHasOther = true;

					numberRegisted.map(({ _id: _idRegisted, num }) => {
						if (value == num) if (_idRegisted != data?._id) notHasOther = false;
					});

					return notHasOther;
				}),
		}),
		onSubmit,
	});
	return (
		<div className={style.form_container}>
			<Form>
				<FormGroup>
					<Label for="placa">Placa</Label>
					<Input
						className={style.input}
						type="text"
						name="placa"
						id="placa"
						placeholder="Escriba aquí"
						value={formik.values.placa}
						onChange={formik.handleChange}
						invalid={!!formik.errors.placa}
					/>
					<FormFeedback>{formik.errors.placa}</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Label for="num">Número de Unidad</Label>
					<Input
						className={style.input}
						type="number"
						name="num"
						id="num"
						placeholder="Escriba aquí"
						value={formik.values.num}
						onChange={formik.handleChange}
						invalid={!!formik.errors.num}
					/>
					<FormFeedback>{formik.errors.num}</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="ruta">Ruta</Label>
					<Input
						className={style.input}
						type="select"
						name="ruta"
						id="ruta"
						value={formik.values.ruta}
						onChange={formik.handleChange}
						invalid={!!formik.errors.ruta}
					>
						<option value={null}>Seleccione una ruta</option>

						{rutas.map((r) => (
							<option value={r._id} key={r._id}>
								{r.name}
							</option>
						))}
					</Input>
				</FormGroup>
				<Button
					onClick={() => formik.submitForm()}
					className={style.button}
					type="button"
					color="primary"
				>
					Guardar
				</Button>
			</Form>
		</div>
	);
};

export default BusForm;
