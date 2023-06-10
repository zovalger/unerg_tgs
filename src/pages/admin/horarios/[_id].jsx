//React/Next
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

//Componentes
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos
import styleN from "@/styles/Nav/NavStyle.module.css";
import BusForm from "@/components/BusView/BusForm";

import {
	getTimetable_By_Id_Request,
	updateTimetable_Request,
} from "@/api/timetable.api";
import TimetableForm from "@/components/TimetableView/TimetableForm";
import ToastContext from "@/contexts/Toast.context";

const AddBuss = () => {
	const router = useRouter();
	const { _id } = router.query;
	const [data, setData] = useState(null);

	const [isSubmiting, setIsSubmitin] = useState(false);
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	useEffect(() => {
		if (_id)
			withLoadingSuccessAndErrorFuntionsToast(
				getTimetable_By_Id_Request(_id),
				({ data }) => {
					setData(data);
					return "cargado";
				},
				(error) => {
					console.log(error);
					setIsSubmitin(false);

					const { message, error: err } = error.response.data;
					return err ? message : error.message;
				}
			);
	}, [_id]);

	//useState

	const onSubmit = async (formData) => {
		if (isSubmiting) return;
		setIsSubmitin(true);

		console.log(formData);

		withLoadingSuccessAndErrorFuntionsToast(
			updateTimetable_Request(_id, formData),
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
				{data && <TimetableForm onSubmit={onSubmit} data={data} />}
			</div>
		</Layout>
	);
};

export default AddBuss;
