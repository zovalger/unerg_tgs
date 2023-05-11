//React/Next
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Componentes

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";
import { MdPhotoCamera } from "react-icons/md";

//Estilos

import styles from "../../../styles/Conductores/add.module.css";
import styleN from "../../../styles/Nav/NavStyle.module.css";

//Contextos

const Add = () => {
  const [fileError, setFileError] = useState("");

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      setFileError("Solo se permiten archivos de imagen");
      event.target.value = "";
    } else {
      setFileError("");
    }
  }

  return (
    <Layout>
      <NavBar
        left={
          <>
            <div>
              <Link href={"./menu"} className={styleN.btn_return}>
                <IoIosArrowBack />
              </Link>
            </div>
            <div className={styleN.title_nav}>
              <h2>Conductores</h2>
            </div>
          </>
        }
        right={<></>}
      />

      <div className={styles.container}>
        <Form>
          <FormGroup>
            <Input
              id="img_perfil"
              name="img_perfil"
              type="file"
              className={styles.input_img}
              onChange={handleFileUpload}
            />

            {/* <MdPhotoCamera /> */}

            {fileError && <p>{fileError}</p>}
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="nombre" className={styles.label}>
              Nombre
            </Label>

            <Input
              id="nombre"
              name="nombre"
              type="text"
              className={styles.input}
            />
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="apellidos" className={styles.label}>
              Apellidos
            </Label>

            <Input
              id="apellidos"
              name="apellidos"
              type="text"
              className={styles.input}
            />
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="cedula" className={styles.label}>
              Cedula
            </Label>

            <Input
              id="cedula"
              name="cedula"
              type="text"
              className={styles.input}
            />
          </FormGroup>

          <FormGroup className={styles.container_input__multi}>
            <div className={styles.inputs_multi}>
              <Label for="edad" className={styles.label}>
                Edad
              </Label>

              <Input
                id="edad"
                name="edad"
                type="text"
                className={styles.input}
              />
            </div>

            <div className={styles.inputs_multi}>
              <Label for="tipo_sangre" className={styles.label}>
                Tipo de sangre
              </Label>

              <Input
                id="tipo_sangre"
                name="tipo_sangre"
                type="text"
                className={styles.input}
              />
            </div>

            <div className={styles.inputs_multi}>
              <Label for="telefono" className={styles.label}>
                Teléfono
              </Label>

              <Input
                id="telefono"
                name="telefono"
                type="text"
                className={styles.input}
              />
            </div>

            <div className={styles.inputs_multi}>
              <Label for="de_emergencia" className={styles.label}>
                De emergencia
              </Label>

              <Input
                id="de_emergencia"
                name="de_emergencia"
                type="text"
                className={styles.input}
              />
            </div>
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="direccion" className={styles.label}>
              Dirección
            </Label>

            <Input
              id="direccion"
              name="direccion"
              type="text"
              className={styles.input}
            />
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="usuario" className={styles.label}>
              Nombre de Usuario
            </Label>

            <Input
              id="usuario"
              name="usuario"
              type="text"
              className={styles.input}
            />
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="correo" className={styles.label}>
              Correo Electrónico
            </Label>

            <Input
              id="correo"
              name="correo"
              type="text"
              className={styles.input}
            />
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="turno" className={styles.label}>
              Turno
            </Label>

            <Input
              id="turno"
              name="turno"
              type="select"
              className={styles.input}
            />
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="autobus" className={styles.label}>
              Autobús
            </Label>

            <Input
              id="autobus"
              name="autobus"
              type="select"
              className={styles.input}
            />
          </FormGroup>



          <FormGroup className={styles.container_input}>
           
          <Button className={styles.button} type="submit">
            Guardar
          </Button>

          </FormGroup>
         
        </Form>
      </div>
    </Layout>
  );
};

export default Add;
