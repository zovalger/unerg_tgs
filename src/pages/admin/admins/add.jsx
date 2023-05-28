//React/Next
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Componentes

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styles from "@/styles/Users/admin/Admins/add.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";
import AdminForm from "@/components/AddAdmin/AdminForm";
import ToastContext from "@/contexts/Toast.context";
import { createAdminUser_Request } from "@/api/userAdmin.api";
import { useRouter } from "next/router";

//Contextos

//******************************* Codigo*****************************//
const Add = () => {
	const router = useRouter();

	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const onSubmit = async (formdata) => {
		withLoadingSuccessAndErrorFuntionsToast(
			createAdminUser_Request(formdata),
			(res) => {
				console.log(res.data);
				router.replace("./menu");

				return "Guardado";
			},
			(error) => {
				const message = error.response.data.message;
				console.log(error);
				return message ? message : error.message;
			}
		);
	};
	return (
		<Layout>
			<NavBar
				left={
					<>
						<div>
							<Link href={"./menu"} replace className={styleN.btn_return}>
								<IoIosArrowBack />
							</Link>
						</div>
						<div className={styleN.title_nav}>
							<h2>Administradores</h2>
						</div>
					</>
				}
				right={<></>}
			/>
			<div className={styles.container}>
				<AdminForm onSubmit={onSubmit} />
			</div>
		</Layout>
	);
};

export default Add;
