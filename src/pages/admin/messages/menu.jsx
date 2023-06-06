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


//Contextos

import { getAllUserDriver_service } from "@/services/userDriver.service";
import dbConnect from "@/lib/db";

const Menu = ({ drivers }) => {
	const router = useRouter();

    const onClick = () => {
		router.push(`./chat/chat`);
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


export const getServerSideProps = async (context) => {
	await dbConnect();

	const data = await getAllUserDriver_service();

	console.log(data);

	console.log();

	const drivers = JSON.parse(JSON.stringify(data));

	return {
		props: { drivers },
	};
};