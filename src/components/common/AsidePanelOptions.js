import styleN from "@/styles/Nav/NavStyle.module.css";
import { GiBusStop } from "react-icons/gi";
import { TbRoute, TbBus } from "react-icons/tb";
import { GrChatOption, GrGroup } from "react-icons/gr";
import { BiBus } from "react-icons/bi";
import { AiOutlineFieldTime, AiOutlineUser } from "react-icons/ai";
import { BsMap } from "react-icons/bs";

const pathAdmin = "/admin";

export const adminOptions = [
	{
		link: `${pathAdmin}/map`,
		name: "Mapa",
		icon: <BsMap className={styleN.route} />,
	},

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
		icon: <BiBus className={styleN.route} />,
		permission: "busView",
	},

	{
		link: `${pathAdmin}/conductores/menu`,
		name: "Conductores",
		icon: <GrGroup className={styleN.route} />,
		permission: "driverView",
	},

	{
		link: `${pathAdmin}/horarios/menu`,
		name: "Horarios",
		icon: <AiOutlineFieldTime className={styleN.route} />,
		// permission: "driverView",
	},

	{
		link: `${pathAdmin}/admins/menu`,
		name: "Administradores",
		icon: <AiOutlineUser className={styleN.route} />,
		permission: "adminView",
	},

	{
		link: `${pathAdmin}/messages/menu`,
		name: "Chat",
		icon: <GrChatOption className={styleN.route} />,
		permission: "adminView",
	},
];

const pathDriver = "/driver";

export const driverOptions = [
	//	{
	//	link: `${pathAdmin}/map`,
	//	name: "Rutas",
	//	icon: <BsMap className={styleN.route} />,
	//},
	{
		link: `${pathDriver}/map`,
		name: "Mapa",
		icon: <BsMap className={styleN.route} />,
	},

	{
		link: `${pathDriver}/chat/chat`,
		name: "Chat",
		icon: <GrChatOption className={styleN.route} />,
	},
	{
		link: `${pathDriver}/capacidad`,
		name: "Capacidad del Bus",
		icon: <TbBus className={styleN.route} />,
	},
];
