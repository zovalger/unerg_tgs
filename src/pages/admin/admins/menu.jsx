//React-Next
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Componentes
import {
  Form,
  FormGroup,
  Input,
  Button,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import Btn_admin from "@/components/AddAdmin/Btn_admin";

import { FaSearch, FaBusAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiBusStop } from "react-icons/gi";
import { IoIosLogOut, IoIosAdd } from "react-icons/io";
import { GrReturn } from "react-icons/gr";

//Estilos
import style from "@/styles/Bus/menu.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import UserContext from "@/contexts/User.context";

//*************************** Codigo  ************************/

const MenuAdmin = () => {
  //useContext

  const { logout, user } = useContext(UserContext);

  //useState

  //Menu desplegable del nav
  const [offcanvasActive, setOffcanvasActive] = useState(false);
  const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

  //Buscador
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Término de búsqueda:", searchTerm);
  };

  return (
    <Layout>
      <div className={style.container}>
        <NavBar
          title={"Administradores"}
          ViPrincipal={true}
          left={
            <div onClick={toggleOffcanvas} className={styleN.HamburgerMenu}>
              <RxHamburgerMenu />
            </div>
          }
          right={
            <>
              <Link className={style.btn_add} href={"./add"}>
                <IoIosAdd />
              </Link>
            </>
          }
        />

        <div className="container mt-3">
          <Form inline onSubmit={handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group">
                <Input
                  type="text"
                  name="searchTerm"
                  id="searchTerm"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <Button type="submit" color="primary">
                    <FaSearch />
                  </Button>
                </div>
              </div>
            </FormGroup>
          </Form>
          <div>
            <Btn_admin />
          </div>
        </div>
      </div>

      {/* panel lateral desplegable */}

      <div>
        <Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas}>
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
                {user ? (
                  <>
                    <p>
                      {user.name} {user.lastname}
                    </p>
                    <p>V-29.852.475</p>
                    <p>{user.role}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </OffcanvasHeader>
          <OffcanvasBody style={{ padding: 0 }}>
            {/*********  Botones del panel lateral desplegable   *********/}

            {/* <button
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
							</button> */}

            <Link href={"../rutas/menu"} className={styleN.btn_nav}>
              <TbRoute className={styleN.route} />
              <p>Rutas</p>
            </Link>

            <Link href={"../paradas/menu"} className={styleN.btn_nav}>
              <GiBusStop className={styleN.route} />
              <p>Paradas</p>
            </Link>

            <Link href={"../autobuses/menu"} className={styleN.btn_nav}>
              <FaBusAlt className={styleN.route} />
              <p>Autobuses</p>
            </Link>

            <Link href={"../map"} className={styleN.btn_nav}>
              <GrReturn className={styleN.route} />
              <p>Regresar</p>
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
        </Offcanvas>
      </div>
    </Layout>
  );
};

export default MenuAdmin;
