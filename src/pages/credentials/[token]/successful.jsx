import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import style from "@/styles/Login/login.module.css";
import Layout from "@/layouts/Layout";
import Link from "next/link";

const Succesful = () => {
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
								<strong>Cambio de contraseña exitoso</strong>
							</p>
						</div>
							{/* <p>Desea iniciar sesion?</p> */}
					</div>

					<Link className={style.successful} href={"/login"}>
						Iniciar sesión
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Succesful;
