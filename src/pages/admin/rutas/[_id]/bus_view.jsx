//React-Next

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";


//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import InfoBus from "@/components/RouteView/infoBus/BtnBus_info/InfoBus";
import InfoCondcutor from "@/components/RouteView/infoBus/BtnBus_info/InfoConductor";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";
import style from "@/styles/Routes/routes_view.module.css";


//Contextos

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
  ssr: false,
});

//**********************************  Codigo  ************************//

const Bus_view = () => {

    const router = useRouter();
	const { _id } = router.query;
  return (
    <Layout>
      <div className="AppView">
        {/* nav customizable */}

        <NavBar
          left={
            <>
              <div>
                <Link
                  className={styleN.btn_return}
                  href={`../${_id}`}
                  onClick={() => {
                    restore();
                  }}
                >
                  <IoIosArrowBack />
                </Link>
              </div>
              <div className={styleN.title_nav}>
                <h2>Bus name</h2>
              </div>
            </>
          }
          right={<></>}
        />

        <div className={`${"MapView__Container"} ${"MapView__ContainerRu"}`}>
          <MapView />
        </div>

        <div className="container__rutas">
            
          <InfoBus />
          <InfoCondcutor />

        </div>
      </div>
    </Layout>
  );
};

export default Bus_view;