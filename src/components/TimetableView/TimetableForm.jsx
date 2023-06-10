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
	Col,
	Row,
	FormText,
} from "reactstrap";

import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";

import { timetableFrontendValidatorSchema } from "@/validations/timetable.validation";
import getWeekDayInitials from "@/utils/getWeekDayInitials";
import moment from "moment";

const TimetableForm = ({ onSubmit, data }) => {
	useEffect(() => {
		if (data) {
			const { startTime, endTime } = data;

			const formated = {
				...data,
				startTime: moment(startTime).format("HH:mm"),
				endTime: moment(endTime).format("HH:mm"),
			};

			formik.setValues(formated);
		}
	}, [data]);

	const onChangeType = (type) => {
		console.log(type);
		formik.setFieldValue("type", type);
	};

	const dayToggle = (day) => {
		const { workDays } = formik.values;
		const i = workDays.findIndex((v) => v === day);

		const newDays =
			i <= -1 ? [...workDays, day] : workDays.filter((v) => v != day);

		formik.setFieldValue("workDays", newDays);
	};

	// todo: tratar las fechas entrantes para los input time

	const formik = useFormik({
		initialValues: data || {
			name: "",
			description: "",
			startTime: "",
			endTime: "",
			workDays: [],
			type: "d",
		},
		validationSchema: timetableFrontendValidatorSchema,
		onSubmit: (formData) => {
			const { startTime, endTime } = formData;
			const [ih, im] = startTime.split(":");
			const [eh, em] = endTime.split(":");

			const data = {
				...formData,
				startTime: new Date(0, 0, 0, ih, im),
				endTime: new Date(0, 0, 0, eh, em),
			};

			onSubmit(data);
		},
	});
	return (
		<Form>
			<FormGroup>
				<Label for="name">Nombre</Label>
				<Input
					className={style.input}
					type="text"
					name="name"
					id="name"
					placeholder="Escriba aquí"
					autoComplete="none"
					value={formik.values.name}
					onChange={formik.handleChange}
					invalid={!!formik.errors.name}
				/>
				<FormFeedback>{formik.errors.name}</FormFeedback>
			</FormGroup>
			<FormGroup>
				<Label for="description">Descripion</Label>
				<Input
					className={style.input}
					type="text"
					name="description"
					id="description"
					placeholder="Escriba aquí"
					autoComplete="none"
					value={formik.values.description}
					onChange={formik.handleChange}
					invalid={!!formik.errors.description}
				/>
				<FormFeedback>{formik.errors.description}</FormFeedback>
			</FormGroup>
			<Row>
				<Col>
					<FormGroup>
						<Label for="startTime">Inicio</Label>
						<Input
							className={style.input}
							type="time"
							name="startTime"
							id="startTime"
							placeholder="Escriba aquí"
							value={formik.values.startTime}
							onChange={formik.handleChange}
							invalid={!!formik.errors.startTime}
						/>
						<FormFeedback>{formik.errors.startTime}</FormFeedback>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="endTime">Final</Label>
						<Input
							className={style.input}
							type="time"
							name="endTime"
							id="endTime"
							placeholder="Escriba aquí"
							value={formik.values.endTime}
							onChange={formik.handleChange}
							invalid={!!formik.errors.endTime}
						/>
						<FormFeedback>{formik.errors.endTime}</FormFeedback>
					</FormGroup>
				</Col>
			</Row>

			<h5>Dias de trabajo</h5>

			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				{(() => {
					let a = [];

					for (let index = 0; index <= 6; index++) {
						a.push(
							<div
								onClick={() => dayToggle(index)}
								style={{
									padding: "1rem",
									minWidth: "1rem",
									minHeight: "1rem",
									outline: formik.values.workDays.includes(index)
										? "2px solid blue"
										: "",
								}}
							>
								{getWeekDayInitials(index)}
							</div>
						);
					}

					return a;
				})()}
			</div>

			<h5>Dirigido a:</h5>
				<FormText>
					El tipo de horario no puede ser modificado despues de su creacin
				</FormText>
			<FormGroup check>
				<Input
					name="type"
					type="radio"
					id="parada"
					checked={formik.values.type == "d"}
					onChange={() => (!formik.values._id ? onChangeType("d") : null)}
				/>
				<Label check for="parada">
					Conductores
				</Label>
			</FormGroup>
			<FormGroup check className="mb-3">
				<Input
					name="type"
					type="radio"
					id="control_point"
					checked={formik.values.type == "r"}
					onChange={() => (!formik.values._id ? onChangeType("r") : null)}
				/>
				<Label check for="control_point">
					Rutas
				</Label>
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
	);
};

export default TimetableForm;
