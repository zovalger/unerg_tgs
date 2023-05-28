import { Form, FormGroup, Input, Label, Button, FormText } from "reactstrap";
import style from "@/styles/Login/login.module.css";
import Layout from "@/layouts/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToastContext from "@/contexts/Toast.context";
import { sendEmailToChangePassword_Request } from "@/api/auth.api";
import { useContext, useState } from "react";
const Forgot_password = () => {
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);
	const [readonly, setReadonly] = useState(false);

	const formik = useFormik({
		initialValues: { email: "" },
		validationSchema: Yup.object({ email: Yup.string().required().email() }),
		onSubmit: (formData) => {
			setReadonly(true);

			withLoadingSuccessAndErrorFuntionsToast(
				sendEmailToChangePassword_Request(formData),
				(res) => {
					return "Revise su correo electronico";
				},
				(error) => {
					setReadonly(false);
					return error.message;
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
								<strong>Olvide mi contraseña</strong>
							</p>
						</div>
					</div>
					<Form onSubmit={formik.handleSubmit}>
						<FormGroup floating>
							<Input
								className={style.input}
								id="email"
								name="email"
								placeholder="email"
								type="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								invalid={!!formik.errors.email}
								readOnly={readonly}
								disabled={readonly}
							/>
							<Label className={style.label} for="email">
								Correo Electronico
							</Label>
						</FormGroup>

						<Button className={style.button} type="submit">
							Enviar solicitud
						</Button>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default Forgot_password;
