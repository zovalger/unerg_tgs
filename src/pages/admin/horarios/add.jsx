//React/Next

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { createBus_Request } from "@/api/bus.api";
import BusForm from "@/components/BusView/BusForm";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import BusContext from "@/contexts/Bus.context";
import TimetableForm from "@/components/TimetableView/TimetableForm";
import { createTimetable_Request } from "@/api/timetable.api";
import ToastContext from "@/contexts/Toast.context";

//*********************************  Codigo  **************************//
const AddTimetable = () => {
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const router = useRouter();
	//useState

	const [isSubmiting, setIsSubmitin] = useState(false);

	const onSubmit = async (formData) => {
		if (isSubmiting) return;
		setIsSubmitin(true);

		console.log(formData);

		withLoadingSuccessAndErrorFuntionsToast(
			createTimetable_Request(formData),
			({ data }) => {
				console.log(data);
				router.back();
				return "guardado";
			},
			(error) => {
				console.log(error);
				setIsSubmitin(false);

				const { message, error: err } = error.response.data;
				return err ? message : error.message;
			}
		);
	};

	return (
		<Layout>
			<NavBar
				left={
					<>
						<div>
							<Link href={"./menu"} className={styleN.btn_return}>
								<IoIosArrowBack />
							</Link>
						</div>
						<div className={styleN.title_nav}>
							<h2>Horarios</h2>
						</div>
					</>
				}
				right={<></>}
			/>
			<div className="container mt-4">
				<TimetableForm onSubmit={onSubmit} />
			</div>
		</Layout>
	);
};

export default AddTimetable;
