import { FaBusAlt } from "react-icons/fa";
import { GiBusStop } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { ImUser, ImUsers } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { TbRoute } from "react-icons/tb";
import Link from "next/link";

import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

import styleN from "@/styles/Nav/NavStyle.module.css";
import { useContext } from "react";
import UserContext from "@/contexts/User.context";

import { v4 as uuid } from "uuid";
import { adminOptions, driverOptions } from "./AsidePanelOptions";

export default function AsidePanel({
	children,
	offcanvasActive,
	toggleOffcanvas,
	location,
}) {
	const { logout, user } = useContext(UserContext);

	return (
		<Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas}>
			<OffcanvasHeader toggle={toggleOffcanvas} className={styleN.header_nav}>
				<div className={styleN.user_container}>
					<div className={styleN.user__img}>
						<div className={styleN.container__img}>
							<img
								src={
									user && user.perfilImg.url
										? user.perfilImg.url
										: "/User_icon.png"
								}
								alt="imagen de perfil"
							/>
						</div>
					</div>

					<div className={styleN.user__info}>
						{user && (
							<>
								<p className={styleN.name}>{user.name}</p>
								<p>{user.CI}</p>
								<p>{user.role}</p>
							</>
						)}
					</div>
				</div>
			</OffcanvasHeader>
			<OffcanvasBody style={{ padding: 0 }}>
				{location && (
					<button
						className={styleN.btn_nav}
						onClick={() => {
							// si esta en true se va a desactivar
							if (viewUserCoord) {
								toogleViewUserCoord(false);
							} else {
								toogleViewUserCoord(true);
								getCoordsUser();
								setOffcanvasActive(!offcanvasActive);
							}
						}}
					>
						<GoLocation className={styleN.route} />
						<p>Mi Ubicación</p>
					</button>
				)}

				{/************* Botones para navegar entre rutas ************/}

				{user &&
					(user.permissions
						? adminOptions.map((l) => {
								if (l.permission)
									if (
										!user.permissions ||
										!user.permissions.includes(l.permission)
									)
										return;

								return (
									<Link key={uuid()} href={l.link} className={styleN.btn_nav}>
										{l.icon}
										<p>{l.name}</p>
									</Link>
								);
						  })
						: driverOptions.map((l) => (
								<Link key={uuid()} href={l.link} className={styleN.btn_nav}>
									{l.icon}
									<p>{l.name}</p>
								</Link>
						  )))}

				{children}

				<button
					className={styleN.btn_nav__logout}
					onClick={async () => {
						await logout();
					}}
				>
					<IoIosLogOut className={styleN.route} />
					<p>Salir</p>
				</button>
			</OffcanvasBody>
		</Offcanvas>
	);
}
