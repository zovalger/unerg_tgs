import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";
import Link from "next/link";
import style from "../styles/Login/login.module.css";
import Layout from "@/layouts/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserContext from "@/contexts/User.context";
import { useContext, useState } from "react";
import { login_Request } from "@/api/auth.api";

import { useRouter } from "next/router";
import SocketContext from "@/contexts/Socket.context";
import ToastContext from "@/contexts/Toast.context";

export function Login() {
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const { login } = useContext(UserContext);
	const { resetSocket } = useContext(SocketContext);
	const [isSubmiting, setIsSubmiting] = useState(false);
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.required()
				.email(
					"El texto introducido no tiene el formato de un correo electrónico"
				),
			password: Yup.string().required(),
		}),
		onSubmit: (formData) => {
			if (isSubmiting) return;
			console.log(formData);
			setIsSubmiting(true);

			withLoadingSuccessAndErrorFuntionsToast(
				login(formData),
				(user) => {
					console.log(user);
					resetSocket();

					if (user.role == "admin" || user.role == "root")
						router.push("/admin/map");
					else router.push(`/driver/map`);

					return "autenticado correctamente";
				},
				(error) => {
					console.log(error);
					setIsSubmiting(false);
					const message = error.response.data.message;
					console.log(error);
					return message ? message : error.message;
				}
			);
		},
	});
	return (
		<Layout>
			<div className={style.bg}>
				<div className={style.container}>
					<div className={style.content}>
						<div className={style.title}>
							<p>
								<strong>UNERG TGS</strong>
							</p>
						</div>
						<div className={style.text}>
							<p>
								<strong>Iniciar sesión</strong>
							</p>
						</div>
					</div>
					<Form onSubmit={formik.handleSubmit}>
						<FormGroup floating>
							<Input
								className={style.input}
								value={formik.values.email}
								invalid={!!formik.errors.email}
								onChange={formik.handleChange}
								id="email"
								name="email"
								placeholder="Correo electrónico"
								type="email"
							/>
							{/* <FormFeedback>{formik.errors.email}</FormFeedback> */}

							<Label className={style.label} for="email">
								Correo electrónico
							</Label>
						</FormGroup>

						<FormGroup floating>
							<Input
								className={style.input}
								value={formik.values.password}
								invalid={!!formik.errors.password}
								onChange={formik.handleChange}
								id="password"
								name="password"
								placeholder="password"
								type="password"
							/>
							<Label className={style.label} for="password">
								Contraseña
							</Label>
						</FormGroup>
						<Button className={style.button}>Iniciar sesión</Button>
					</Form>
					<Link href="/credentials/forgot-password" className={style.link}>
						Olvide mi Contraseña
					</Link>
				</div>
			</div>
		</Layout>
	);
}
export default Login;
