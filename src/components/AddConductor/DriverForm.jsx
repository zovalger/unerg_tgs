//React/Next
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useFormik } from "formik";
import * as Yup from "yup";

//Componentes

import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	FormFeedback,
} from "reactstrap";

import Modal_add from "@/components/AddConductor/Modal/Modal_add";

//Estilos

import styles from "@/styles/Users/admin/Conductores/add.module.css";
import { driverUserValidatorSchema } from "@/validations/driverUser.validation";
import calculateAge from "@/utils/calculateAge";

import moment from "moment";
import { sendImg_Request } from "@/api/file.api";
import ToastContext from "@/contexts/Toast.context";
//Contextos

//******************************* Codigo*****************************//
const placeholderImage = "/Camera_Icon.png";

const DriverForm = ({ onSubmit, data, timetables, buses }) => {
	//UseState

	//Comprobación de la imagen
	const [fileError, setFileError] = useState("");
	const [img, setImg] = useState(
		data
			? data.perfilImg.url
				? data.perfilImg.url
				: placeholderImage
			: placeholderImage
	);
	const [perfilImg, setPerfilImg] = useState(
		data ? data.perfilImg : { url: null, imgfileId: null }
	);
	const [submitImage, setSubmitImage] = useState(false);

	const { withLoadingSuccessAndErrorFuntionsToast, showErrorToast } =
		useContext(ToastContext);

	const handleFileUpload = async (event) => {
		const input = event.target;

		const file = input.files[0];
		const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

		if (!file) {
			input.value = "";
			setImg(placeholderImage);
		} else {
			if (!allowedTypes.includes(file.type)) {
				setFileError("Solo se permiten archivos de imagen");
				input.value = "";
				setImg(placeholderImage);
			} else {
				setFileError("");
				const reader = new FileReader();

				reader.onload = async (event) => {
					const dataBase64 = event.target.result;

					setSubmitImage(true);

					withLoadingSuccessAndErrorFuntionsToast(
						sendImg_Request({ data: dataBase64 }),
						(res) => {
							const { _id, url } = res.data;

							setPerfilImg({ url, imgfileId: _id });

							setImg(dataBase64);
							setSubmitImage(false);

							return "Imagen cargada";
						},
						(error) => {
							setImg(placeholderImage);
							setSubmitImage(false);
							input.value = "";
							return error.message;
						},
						"Subiendo imagen"
					);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	//Modal del input Turno
	const [Mo_turno, setModal_Turno] = useState(false);
	const active_MoTurno = () => setModal_Turno(!Mo_turno);

	//Valor del input "Turno"
	const [turno, setTurno] = useState("");

	//Modal del input autobus
	const [Mo_bus, setModal_Bus] = useState(false);
	const active_MoBus = () => setModal_Bus(!Mo_bus);

	//Valor del input "autobus"
	const [bus, setBus] = useState("");

	const formik = useFormik({
		initialValues: data
			? { ...data, birthdate: new Date(data.birthdate) }
			: {
					name: "",
					CI: "",
					birthdate: new Date(Date.now()),
					address: "",
					bloodType: "Indefinido",
					phone: "",
					emergencyPhone: "",
					email: "",

					perfilImg: {
						url: "",
						imgfileId: "",
					},
					busId: "",
					timetableId: "",
			  },
		validationSchema: driverUserValidatorSchema,
		onSubmit: (formData) => {
			formData.perfilImg = perfilImg;
			onSubmit(formData);
		},
	});

	const onChangeDate = (date, { from, to }) => {
		// let edad = calculateAge(date);
		// if (typeof edad === "number" && edad >= 0)
		// 	return formik.setValues({ ...formik.values, [from]: date, [to]: edad });

		formik.setFieldValue(from, date);
	};

	return (
		<Form>
			<FormGroup>
				<Label htmlFor="img_perfil" className={styles.input_img}>
					<img
						src={img}
						alt="Imagen de perfil"
						style={
							img === placeholderImage
								? { padding: "80px", borderRadius: "0" }
								: null
						}
					/>

					{/* <Image
						src={img}
						height={600}
						width={600}
						alt="Imagen de perfil"
						style={
							img === placeholderImage
								? { padding: "80px", borderRadius: "0" }
								: null
						}
					/> */}
				</Label>

				<Input
					id="img_perfil"
					name="img_perfil"
					type="file"
					// className={styles.hidden_input}
					hidden
					onChange={handleFileUpload}
					accept="image/*"
				/>

				{fileError && <p>{fileError}</p>}
			</FormGroup>
			{/********************************  Input para los Nombres *********************************/}
			<FormGroup className={styles.container_input}>
				<Label for="name" className={styles.label}>
					Nombre completo
				</Label>

				<Input
					id="name"
					name="name"
					type="text"
					autoComplete="none"
					className={styles.input}
					placeholder="Escriba aqui"
					value={formik.values.name}
					onChange={formik.handleChange}
					invalid={!!formik.errors.name}
				/>
				<FormFeedback>{formik.errors.name}</FormFeedback>
			</FormGroup>

			{/********************************  Input para la Cédula *********************************/}
			<FormGroup className={styles.container_input}>
				<Label for="CI" className={styles.label}>
					Cédula
				</Label>
				<Input
					id="CI"
					name="CI"
					type="number"
					autoComplete="none"
					className={styles.input}
					placeholder="00000000"
					value={formik.values.CI}
					onChange={formik.handleChange}
					invalid={!!formik.errors.CI}
					onWheel={(e) => e.target.blur()}
				/>
				<FormFeedback>{formik.errors.CI}</FormFeedback>
			</FormGroup>
			{/********************************  Container de varios inputs *********************************/}
			<FormGroup className={styles.container_input__multi}>
				{/********************************  input para la fecha de nacimiento *********************************/}

				<div className={styles.inputs_multi}>
					<Label>Fecha de nacimiento</Label>
					<DatePicker
						locale={es}
						// className=""
						className={`form-control ${styles.input}`}
						selected={formik.values.birthdate}
						onChange={(date) => formik.setFieldValue("birthdate", date)}
						// peekNextMonth
						showMonthDropdown
						showYearDropdown
						dropdownMode="select"
						dateFormat="dd/MM/yyyy"
						placeholderText="00/00/0000"
						invalid={!!formik.errors.birthdate}
					/>

					{/* input para poner la funcionalidad de feedback de boostrap */}
					<Input
						// value={formik.values.birthdate}
						invalid={!!formik.errors.birthdate}
						hidden
					/>

					<FormFeedback>
						{`${formik.errors.birthdate} - Edad colocada: ${calculateAge(
							formik.values.birthdate
						)}`}
					</FormFeedback>
				</div>

				{/********************************  input para el Tipo de Sangre *********************************/}

				<div className={styles.inputs_multi}>
					<Label for="bloodType" className={styles.label}>
						Tipo de sangre
					</Label>
					<Input
						id="bloodType"
						name="bloodType"
						type="select"
						className={styles.input}
						placeholder="Escriba aqui"
						value={formik.values.bloodType}
						onChange={formik.handleChange}
						invalid={!!formik.errors.bloodType}
					>
						<option value="Indefinido">Indefinido</option>
						<option value="A+">A+</option>
						<option value="A-">A-</option>
						<option value="B+">B+</option>
						<option value="B-">B-</option>
						<option value="AB+">AB+</option>
						<option value="AB-">AB-</option>
						<option value="O+">O+</option>
						<option value="O-">O-</option>
					</Input>
					<FormFeedback>{formik.errors.bloodType}</FormFeedback>
				</div>

				{/********************************  input para el Teléfono *********************************/}

				{/* // todo: cambiar a columnas y filas*/}
				<div className={styles.inputs_multi}>
					<Label for="phone" className={styles.label}>
						Teléfono
					</Label>
					<Input
						id="phone"
						name="phone"
						type="text"
						autoComplete="none"
						className={styles.input}
						placeholder="Escriba aqui"
						value={formik.values.phone}
						onChange={formik.handleChange}
						invalid={!!formik.errors.phone}
					/>
					<FormFeedback>{formik.errors.phone}</FormFeedback>
				</div>

				{/********************************  input para Teléfono "De Emergencia" *********************************/}

				<div className={styles.inputs_multi}>
					<Label for="emergencyPhone" className={styles.label}>
						De emergencia
					</Label>
					<Input
						id="emergencyPhone"
						name="emergencyPhone"
						type="text"
						autoComplete="none"
						className={styles.input}
						placeholder="Escriba aqui"
						value={formik.values.emergencyPhone}
						onChange={formik.handleChange}
						invalid={!!formik.errors.emergencyPhone}
					/>
					<FormFeedback>{formik.errors.emergencyPhone}</FormFeedback>
				</div>
			</FormGroup>
			{/********************************  input para la Dirección *********************************/}
			<FormGroup className={styles.container_input}>
				<Label for="address" className={styles.label}>
					Dirección
				</Label>
				<Input
					id="address"
					name="address"
					type="text"
					autoComplete="none"
					className={styles.input}
					placeholder="Escriba aqui"
					value={formik.values.address}
					onChange={formik.handleChange}
					invalid={!!formik.errors.address}
				/>
				<FormFeedback>{formik.errors.address}</FormFeedback>
			</FormGroup>

			{/********************************  input para el Correo Electrónico *********************************/}

			<FormGroup className={styles.container_input}>
				<Label for="email" className={styles.label}>
					Correo Electrónico
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					autoComplete="none"
					className={styles.input}
					placeholder="Escriba aqui"
					value={formik.values.email}
					onChange={formik.handleChange}
					invalid={!!formik.errors.email}
				/>
				<FormFeedback>{formik.errors.email}</FormFeedback>
			</FormGroup>

			{/********************************  input para el Turno *********************************/}

			<FormGroup className={styles.container_input}>
				<Label for="timetableId" className={styles.label}>
					Turno
				</Label>
				<Input
					id="timetableId"
					name="timetableId"
					type="select"
					className={styles.input}
					placeholder="Escriba aqui"
					value={formik.values.timetableId}
					onChange={formik.handleChange}
					invalid={!!formik.errors.timetableId}
				>
					<option value={""}>Seleccione turno</option>

					{timetables &&
						timetables.map((t) => (
							<option value={t._id} key={t._id}>
								{`${t.name}: ${moment(t.startTime).format("h:mm a")} - ${moment(
									t.endTime
								).format("h:mm a")}`}
							</option>
						))}
				</Input>
				<FormFeedback>{formik.errors.timetableId}</FormFeedback>
			</FormGroup>

			{/* // todo: luego se hara con el modal */}

			{/* 			
			<FormGroup className={styles.container_input}>
				<Label for="turno" className={styles.label}>
					Turno
				</Label>

				<Input
					id="turno"
					name="turno"
					type="text"
					placeholder="Seleccione Opción"
					className={`${styles.input} ${styles.cursor}`}
					readOnly
					value={turno}
					onClick={active_MoTurno}
				/>

				{Mo_turno && (
					<Modal_add active={active_MoTurno} setTurno={setTurno} state={true} />
				)}
			</FormGroup> */}

			{/********************************  input para el Autobús *********************************/}

			<FormGroup className={styles.container_input}>
				<Label for="busId" className={styles.label}>
					Autobús
				</Label>
				<Input
					id="busId"
					name="busId"
					type="select"
					className={styles.input}
					placeholder="Escriba aqui"
					value={formik.values.busId}
					onChange={formik.handleChange}
					invalid={!!formik.errors.busId}
				>
					<option value={""}>Seleccione Autobus</option>

					{buses &&
						buses.map((b) => (
							<option value={b._id} key={b._id}>
								{`Numero: ${b.num} - Placa: ${b.placa}`}
							</option>
						))}
				</Input>
				<FormFeedback>{formik.errors.busId}</FormFeedback>
			</FormGroup>

			{/* <FormGroup className={styles.container_input}>
				<Label for="autobus" className={styles.label}>
					Autobús
				</Label>

				<Input
					id="autobus"
					name="autobus"
					type="text"
					placeholder="Seleccione Opción"
					className={`${styles.input} ${styles.cursor}`}
					readOnly
					value={bus}
					onClick={active_MoBus}
				/>

				{Mo_bus && (
					<Modal_add active={active_MoBus} setBus={setBus} state={false} />
				)}
			</FormGroup> */}

			<FormGroup className={styles.container_input}>
				<Button
					className={styles.button}
					type="button"
					onClick={() => {
						if (submitImage)
							return showErrorToast("Espere a que se suba la image");

						formik.submitForm();
					}}
				>
					Guardar
				</Button>
			</FormGroup>
		</Form>
	);
};

export default DriverForm;
