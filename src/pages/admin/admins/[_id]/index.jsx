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
import {
	createAdminUser_Request,
	updateAdmin_Request,
} from "@/api/userAdmin.api";
import { useRouter } from "next/router";
import { getUserAdmin_service } from "@/services/userAdmin.service";
import dbConnect from "@/lib/db";

//Contextos

//******************************* Codigo*****************************//
const Add = ({ data }) => {
	const router = useRouter();

	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const onSubmit = async (formdata) => {
		withLoadingSuccessAndErrorFuntionsToast(
			updateAdmin_Request(data._id, formdata),
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
				<AdminForm data={data} onSubmit={onSubmit} />
			</div>
		</Layout>
	);
};

export default Add;

export const getServerSideProps = async ({ params }) => {
	await dbConnect();

	const { _id } = params;

	const data = JSON.parse(JSON.stringify(await getUserAdmin_service(_id)));

	return {
		props: { data },
	};
};
