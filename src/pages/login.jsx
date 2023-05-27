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
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import SocketContext from "@/contexts/Socket.context";

export function Login() {
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

			try {
				const myPromise = login(formData);

				toast.promise(myPromise, {
					loading: "Enviando",
					success: (user) => {
						console.log(user);
						resetSocket();
						router.push(`/${user.role}/map`);
						return "autenticado correctamente";
					},
					error: (err, res) => {
						setIsSubmiting(false);
						console.log(err.response.data.error.message);
						console.log(res);

						return err.response.data.error.message;
					},
				});
			} catch (error) {
				setIsSubmiting(false);
				console.log(error);
			}
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
