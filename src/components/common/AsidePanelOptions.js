import permissionsSystem from "@/config/permissionsSystem";
import styleN from "@/styles/Nav/NavStyle.module.css";
import { FaBusAlt } from "react-icons/fa";
import { GiBusStop } from "react-icons/gi";
import { ImUser, ImUsers } from "react-icons/im";
import { TbRoute } from "react-icons/tb";

const pathAdmin = "/admin";

export const adminOptions = [
	{
		link: `${pathAdmin}/rutas/menu`,
		name: "Rutas",
		icon: <TbRoute className={styleN.route} />,
		permission: "rutaView",
	},
	{
		link: `${pathAdmin}/paradas/menu`,
		name: "Paradas",
		icon: <GiBusStop className={styleN.route} />,
		permission: "waypointView",
	},

	{
		link: `${pathAdmin}/autobuses/menu`,
		name: "Autobuses",
		icon: <FaBusAlt className={styleN.route} />,
		permission: "busView",
	},

	{
		link: `${pathAdmin}/conductores/menu`,
		name: "Conductores",
		icon: <ImUsers className={styleN.route} />,
		permission: "driverView",
	},

	{
		link: `${pathAdmin}/admins/menu`,
		name: "Administradores",
		icon: <ImUser className={styleN.route} />,
		permission: "adminView",
	},
];





const pathDriver = "/driver";

export const driverOptions = [
	
];
