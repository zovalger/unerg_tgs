//React-Next

import Link from "next/link";
import { useState } from "react";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";
import styles from "@/styles/Users/driver/capacidad.module.css"

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";

import { IoIosArrowBack } from "react-icons/io";

//Contextos


//****************************** Codigo *****************************//

const Capacidad = () => {
    const [value, setValue] = useState(5); // el valor inicial es 50

    const handleChange = e => {
      setValue(e.target.value);
    };

  return (
    <Layout>
      <NavBar
        title={"Capacidad del bus"}
        ViPrincipal={true}
        left={
          <div>
            <Link href={"./map"} className={styleN.btn_return}>
              <IoIosArrowBack />
            </Link>
          </div>
        }
        right={<></>}
      />

      <div className={styles.container}>

        <Form    className={styles.form}>


        </Form>
        <p>{value}</p>
      </div>
    </Layout>
  );
};

export default Capacidad;
