//React-Next
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Componentes 
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiBusStop } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { FaBusAlt } from "react-icons/fa";
import { ImUsers, ImUser } from "react-icons/im";

import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";

// Contextos
import MapContext from "@/contexts/Map.context";
import UserContext from "@/contexts/User.context";


const NavMenu = () =>{

    const admin = { }

    const driver = {}


    return(
        <>
        
        <OffcanvasHeader
							toggle={toggleOffcanvas}
							className={styleN.header_nav}
						>
							<div className={styleN.user_container}>
								<div className={styleN.user__img}>
									<div className={styleN.container__img}>
										<Image
											src={"/User_icon.png"}
											height={400}
											width={400}
											alt="Perfil"
										/>
									</div>
								</div>

								<div className={styleN.user__info}>
									{user && (
										<>
											<p>{user.name}</p>
											<p>{user.CI}</p>
											<p>{user.role}</p>
										</>
									)}
								</div>
							</div>
						</OffcanvasHeader>
						<OffcanvasBody style={{ padding: 0 }}>
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

							{/************* Botones para navegar entre rutas ************/}

							<Link href={"./rutas/menu"} className={styleN.btn_nav}>
								<TbRoute className={styleN.route} />
								<p>Rutas</p>
							</Link>

							<Link href={"./paradas/menu"} className={styleN.btn_nav}>
								<GiBusStop className={styleN.route} />
								<p>Paradas</p>
							</Link>

							<Link href={"./autobuses/menu"} className={styleN.btn_nav}>
								<FaBusAlt className={styleN.route} />
								<p>Autobuses</p>
							</Link>

							<Link href={"./conductores/menu"} className={styleN.btn_nav}>
								<ImUsers className={styleN.route} />
								<p>Conductores</p>
							</Link>

							<Link href={"./admins/menu"} className={styleN.btn_nav}>
								<ImUser className={styleN.route} />
								<p>Administradores</p>
							</Link>

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

        </>
    )
}

export default NavMenu