//React-Next

import Link from "next/link";
import { useRouter } from "next/router";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import BtnMessages from "@/components/messagesView/BtnMessages";

import { IoIosArrowBack } from "react-icons/io";
import ChatsContext from "@/contexts/Chats.context";

import { getAllDrivers_Request } from "@/api/userDriver.api";
import { useEffect, useState, useContext } from "react";

const Menu = () => {
	const router = useRouter();

	const { chatConnection } = useContext(ChatsContext);

	const [drivers, setDrivers] = useState([]);

	useEffect(() => {
		getAllDrivers_Request().then(({ data }) => setDrivers(data));
	}, []);

	const onClick = (_id) => {
		router.push(`./chat/chat`);
		chatConnection(_id);
	};

	return (
		<Layout>
			<NavBar
				left={
					<>
						<div>
							<Link className={styleN.btn_return} href={"../map"}>
								<IoIosArrowBack />
							</Link>
						</div>
						<div className={styleN.title_nav}>
							<h2>Mensajes</h2>
						</div>
					</>
				}
				right={<></>}
			/>
			<div className="container mt-3">
				{drivers &&
					drivers.map((d) => (
						<BtnMessages key={d._id} data={d} onClick={onClick} />
					))}
			</div>
		</Layout>
	);
};

export default Menu;
