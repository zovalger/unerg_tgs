//React/Next
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styles from "@/styles/Users/admin/Admins/add.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";
import AdminForm from "@/components/AddAdmin/AdminForm";
import ToastContext from "@/contexts/Toast.context";
import {
	getAdmin_By_Id_Request,
	updateAdmin_Request,
} from "@/api/userAdmin.api";
import { useRouter } from "next/router";
import UserContext from "@/contexts/User.context";

//Contextos

//******************************* Codigo*****************************//
const Add = () => {
	const router = useRouter();
	const { _id } = router.query;

	const [data, setData] = useState(null);

	useEffect(() => {
		if (_id)
			getAdmin_By_Id_Request(_id)
				.then(({ data: ad }) => setData(ad))
				.catch((error) => console.log(error));
	}, [_id]);

	const { user, getDataUser } = useContext(UserContext);

	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const onSubmit = async (formdata) => {
		withLoadingSuccessAndErrorFuntionsToast(
			updateAdmin_Request(data._id, formdata),
			(res) => {
				console.log(res.data);

				// if (data._id === user._id)  getDataUser()

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
				{data && <AdminForm data={data} onSubmit={onSubmit} />}
			</div>
		</Layout>
	);
};

export default Add;
