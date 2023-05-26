//React/Next
import { useContext, useRef, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styles from "@/styles/Users/admin/Conductores/add.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";
import DriverForm from "@/components/AddConductor/DriverForm";
import { getAllActiveBuses_service } from "@/services/bus.service";
import dbConnect from "@/lib/db";
import ToastContext from "@/contexts/Toast.context";
import { useRouter } from "next/router";
import { createDriverUser_Request } from "@/api/userDriver.api";

//Contextos

//******************************* Codigo*****************************//
const Add = ({ buses, timetables }) => {
	const router = useRouter();

	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const onSubmit = async (formdata) => {
		withLoadingSuccessAndErrorFuntionsToast(
			createDriverUser_Request(formdata),
			(res) => {
				console.log(res.data);
				router.replace("./menu");

				return "Guardado";
			},
			(error) => {
				return error.message;
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
							<h2>Conductores</h2>
						</div>
					</>
				}
				right={<></>}
			/>

			{/********************************  Input para Imagen de Perfil *********************************/}

			<div className={styles.container}>
				<DriverForm onSubmit={onSubmit} buses={buses} timetables={timetables} />
			</div>
		</Layout>
	);
};

export default Add;

export const getServerSideProps = async (context) => {
	await dbConnect();

	const buses = JSON.parse(JSON.stringify(await getAllActiveBuses_service()));
	// const timetables
	console.log(buses);

	return {
		props: { buses, timetables: null },
	};
};
