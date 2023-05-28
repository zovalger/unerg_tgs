import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import style from "@/styles/Login/login.module.css";
import Layout from "@/layouts/Layout";
import { useContext, useEffect, useState } from "react";
import ToastContext from "@/contexts/Toast.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verify } from "jsonwebtoken";
import { SECRET_WORD } from "@/config";
import { setPassword_Request } from "@/api/auth.api";
import { useRouter } from "next/router";

const Recover_password = ({ token, email, valid }) => {
	const router = useRouter();
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	useEffect(() => {
		if (!valid) router.push("/login");
	}, []);

	const formik = useFormik({
		initialValues: { password: "", confirmPassword: "" },
		validationSchema: Yup.object({
			password: Yup.string().required(),
			confirmPassword: Yup.string()
				.required()
				.oneOf([Yup.ref("password")], "no es igual"),
		}),
		onSubmit: (formData) => {
			withLoadingSuccessAndErrorFuntionsToast(
				setPassword_Request(token, formData),
				(res) => {
					router.push(`../${token}/successful`);

					return "Contraseña cambiada exitosamente";
				},
				(error) => {
					return error.response.data.message || error.message;
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
								<strong>Cambiar mi contraseña</strong>
							</p>
						</div>
					</div>
					<Form onSubmit={formik.handleSubmit}>
						<FormGroup floating>
							<Input
								className={style.input}
								id="exampleUser"
								value={email}
								readOnly
								disabled
							/>
							<Label className={style.label} for="email">
								Correo Electronico
							</Label>
						</FormGroup>

						<FormGroup floating>
							<Input
								className={style.input}
								id="password"
								name="password"
								placeholder="*"
								type="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								invalid={formik.errors.password}
							/>
							<Label className={style.label} for="password">
								Nueva contraseña
							</Label>
						</FormGroup>

						<FormGroup floating>
							<Input
								className={style.input}
								id="confirmPassword"
								name="confirmPassword"
								placeholder="*"
								type="password"
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								invalid={formik.errors.confirmPassword}
							/>
							<Label className={style.label} for="confirmPassword">
								Repita la contraseña
							</Label>
						</FormGroup>

						<Button className={style.button} type="submit">
							Cambiar Contraseña
						</Button>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default Recover_password;

export const getServerSideProps = async ({ params }) => {
	const { token } = params;
	let valid = true;
	let email = "";

	try {
		const { user } = verify(token, SECRET_WORD);
		email = user.email;
	} catch (error) {
		console.log(error);
		valid = false;
	}

	return { props: { token, email, valid } };
};
