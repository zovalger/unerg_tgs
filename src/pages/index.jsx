import Link from "next/link";
import { useEffect, useState } from "react";

//Componentes

import Layout from "../layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

import { RxHamburgerMenu } from "react-icons/rx";

import SectionOne from "@/components/Landing/SectionOne";
import SectionTwo from "@/components/Landing/SectionTwo";
import SectionThree from "@/components/Landing/SectionThree";

import FooterLanding from "@/components/Landing/FooterLanding";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";



const Home = () => {
  const [offcanvasActive, setOffcanvasActive] = useState(false);
  const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);
  return (
    <Layout>
      <NavBar
      Fixed={true}
        left={
          <>
            <div onClick={toggleOffcanvas} className={styleN.oculto}>
              <RxHamburgerMenu />
            </div>
            <div className={styleN.title_nav}>
              <h1>UNERG-TGS</h1>
            </div>
          </>
        }
        right={
          <>
            <div className={styleN.links_nav}>
              <Link href={"/map"}>Mapa</Link>

              <Link href={"/login"}>Iniciar sesión</Link>
            </div>
          </>
        }
      />

      <section>
        <SectionOne />
      </section>
      
      <section>
        <SectionTwo />
      </section>
      
      <section>
        <SectionThree />
      </section>
      <footer>
        <FooterLanding />
      </footer>

      <div>
        <Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas}>
          <OffcanvasHeader
            toggle={toggleOffcanvas}
            className={styleN.header_nav}
          >
            <h2>UNERG-TGS</h2>
          </OffcanvasHeader>
          <OffcanvasBody style={{ padding: 0 }}>
            <Link
              href={"/map"}
              className={styleN.btn_nav}
              style={{ justifyContent: "center" }}
            >
              Mapa
            </Link>

            <Link
              href={"/login"}
              className={styleN.btn_nav}
              style={{ justifyContent: "center" }}
            >
              Iniciar sesión
            </Link>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </Layout>
  );
};

export default Home;
