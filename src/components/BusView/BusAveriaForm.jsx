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
	InputGroup,
} from "reactstrap";

import RutaContext from "@/contexts/Ruta.context";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";

import * as Yup from "yup";
import { getAllNums_Request, getAllPlacas_Request } from "@/api/bus.api";

const BusAveriaForm = ({ onSubmit, data }) => {
	useEffect(() => {}, []);

	const formik = useFormik({
		initialValues: data || {
			content: "",
		},
		validationSchema: Yup.object({
			content: Yup.string()
				.required("El motivo de averia es obligatorio")
				.trim()
				.min(8, "El motivo debe ser mas descriptivo (mas de 8 caracteres)"),
		}),
		onSubmit,
	});
	return (
		<Form onSubmit={(e) => e.preventDefault()}>
			<Label for="placa">Motivo de Averia</Label>
			<InputGroup>
				<Input
					className={style.input}
					type="text"
					name="content"
					id="content"
					placeholder="Escriba aquí el motivo de Averia"
					value={formik.values.content}
					onChange={formik.handleChange}
					invalid={!!formik.errors.content}
				/>
				<Button
					onClick={() => formik.submitForm()}
					// className={style.button}
					style={{ borderRadius: "0 .375rem .375rem 0" }}
					type="button"
					color="primary"
				>
					Guardar
				</Button>
				<FormFeedback>{formik.errors.content}</FormFeedback>
			</InputGroup>
			<FormGroup></FormGroup>
		</Form>
	);
};

export default BusAveriaForm;
