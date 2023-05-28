//React/Next
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

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
import { adminUserValidatorSchema } from "@/validations/adminUser.validation";
import permissionsSystem from "@/config/permissionsSystem";
//Contextos

//******************************* Codigo*****************************//
const placeholderImage = "/Camera_Icon.png";

const AdminForm = ({ onSubmit, data }) => {
	//UseState
	const { withLoadingSuccessAndErrorFuntionsToast, showErrorToast } =
		useContext(ToastContext);

	//Comprobación de la imagen
	const [listPermises, setListPermises] = useState(
		data ? data.permissions : []
	);
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

	const [fileError, setFileError] = useState("");
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

	const formik = useFormik({
		initialValues: data
			? { ...data, birthdate: new Date(data.birthdate) }
			: {
					name: "",
					CI: "",
					birthdate: new Date(Date.now()),
					address: "",
					phone: "",
					email: "",

					perfilImg: {
						url: null,
						imgfileId: null,
					},
			  },
		validationSchema: adminUserValidatorSchema,
		onSubmit: (formData) => {
			formData.perfilImg = perfilImg;
			formData.permissions = listPermises;
			onSubmit(formData);
		},
	});

	const changePermises = (per) => {
		const index = listPermises.findIndex((p) => (p == per ? true : false));

		if (index === -1) {
			setListPermises([...listPermises, per]);
		} else {
			setListPermises(listPermises.filter((p) => (p === per ? false : true)));
		}
	};
	const permissions = () => {
		const list = [];

		for (const key in permissionsSystem) {
			if (Object.hasOwnProperty.call(permissionsSystem, key)) {
				list.push(key);
				// const element = permissionsSystem[key];
			}
		}

		return list.map((i) => (
			<FormGroup check key={uuid()}>
				<Input
					name="type"
					type="switch"
					id="Ver_usuariosAdmin"
					checked={listPermises.includes(i)}
					onChange={() => {
						changePermises(i);
					}}
				/>
				<Label check for="Ver_usuariosAdmin">
					{permissionsSystem[i]}
				</Label>
			</FormGroup>
		));
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

			{/********************************  Input para los permisos*********************************/}
			<FormGroup className={styles.container_input}>
				<Label className={styles.label}>Permisos</Label>
				<div className={styles.container__check}>{permissions()}</div>
			</FormGroup>

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

export default AdminForm;
