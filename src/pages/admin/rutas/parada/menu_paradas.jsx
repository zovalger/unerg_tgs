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
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosAdd } from "react-icons/io";

//Estilos

import style from "../../../../styles/Bus/menu.module.css";
import styleB from "../../../../styles/Routes/routes_view.module.css";
import styleN from "../../../../styles/Nav/NavStyle.module.css";

//Contextos

const Menu_Paradas = () => {
  //useContext

  //useState

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
          left={
            <>
              <div>
                <Link href={"./menu_add"} className={styleN.btn_return}>
                  <IoIosArrowBack />
                </Link>
              </div>
              <div className={styleN.title_nav}>
                <h2>Paradas</h2>
              </div>
            </>
          }
          right={<></>}
        />

          <Link href={"./add_parada"} className={`${styleB.add} ${styleB.add__rutas}`}>
						<IoIosAdd />
					</Link>

        <div className={style.search}>
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
        </div>


        
      </div>
    </Layout>
  );
};

export default Menu_Paradas;
