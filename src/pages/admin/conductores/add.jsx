//React/Next
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Componentes

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import Modal_add from "@/components/AddConductor/Modal/Modal_add";

import { IoIosArrowBack } from "react-icons/io";
import { MdPhotoCamera } from "react-icons/md";

//Estilos

import styles from "@/styles/Conductores/add.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

const Add = () => {
  //UseState

  //Comprobación de la imagen
  const [fileError, setFileError] = useState("");
  const [img, setImg] = useState("/Camera_Icon.png");

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!file) {
      event.target.value = "";
      setImg("/Camera_Icon.png");
    } else {
      if (!allowedTypes.includes(file.type)) {
        setFileError("Solo se permiten archivos de imagen");
        event.target.value = "";
        setImg("/Camera_Icon.png");
      } else {
        setFileError("");
        const reader = new FileReader();

        reader.onload = function (event) {
          setImg(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  //Modal del input Turno

  const [Mo_turno, setModal_Turno] = useState(false);

  const active_MoTurno = () => setModal_Turno(!Mo_turno);

  //Valor del input "Turno"

  const [turno, setTurno] = useState("");



  //Modal del input autobus

  const [Mo_bus, setModal_Bus] = useState(false);

  const active_MoBus = () => setModal_Bus(!Mo_bus);


  //Valor del input "autobus"

  const [bus, setBus] = useState("");

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

      {/********************************  Input para Imagen de Perfil *********************************/}

      <div className={styles.container}>
        <Form>
          <FormGroup>
            <Label htmlFor="img_perfil" className={styles.input_img}>
              <Image
                src={img}
                height={600}
                width={600}
                alt="Imagen de perfil"
                style={
                  img === "/Camera_Icon.png"
                    ? { padding: "80px", borderRadius: "0" }
                    : null
                }
              />
            </Label>

            <Input
              id="img_perfil"
              name="img_perfil"
              type="file"
              className={styles.hidden_input}
              onChange={handleFileUpload}
            />

            {fileError && <p>{fileError}</p>}

            {/********************************  Input para los Nombres *********************************/}
          </FormGroup>

          <FormGroup className={styles.container_input}>
            <Label for="nombres" className={styles.label}>
              Nombres
            </Label>

            <Input
              id="nombres"
              name="nombre"
              type="text"
              className={styles.input}
              placeholder="Escriba aqui"
            />
          </FormGroup>

          {/********************************  Input para los Apellidos *********************************/}

          <FormGroup className={styles.container_input}>
            <Label for="apellidos" className={styles.label}>
              Apellidos
            </Label>

            <Input
              id="apellidos"
              name="apellidos"
              type="text"
              className={styles.input}
              placeholder="Escriba aqui"
            />
          </FormGroup>

          {/********************************  Input para la Cédula *********************************/}

          <FormGroup className={styles.container_input}>
            <Label for="cedula" className={styles.label}>
              Cédula
            </Label>

            <Input
              id="cedula"
              name="cedula"
              type="text"
              className={styles.input}
              placeholder="Escriba aqui"
            />
          </FormGroup>

          {/********************************  Container de varios inputs *********************************/}

          <FormGroup className={styles.container_input__multi}>
            {/********************************  input para la Edad *********************************/}

            <div className={styles.inputs_multi}>
              <Label for="edad" className={styles.label}>
                Edad
              </Label>

              <Input
                id="edad"
                name="edad"
                type="text"
                className={styles.input}
                placeholder="Escriba aqui"
              />
            </div>

            {/********************************  input para el Tipo de Sangre *********************************/}

            <div className={styles.inputs_multi}>
              <Label for="tipo_sangre" className={styles.label}>
                Tipo de sangre
              </Label>

              <Input
                id="tipo_sangre"
                name="tipo_sangre"
                type="text"
                className={styles.input}
                placeholder="Escriba aqui"
              />
            </div>

            {/********************************  input para el Teléfono *********************************/}

            <div className={styles.inputs_multi}>
              <Label for="telefono" className={styles.label}>
                Teléfono
              </Label>

              <Input
                id="telefono"
                name="telefono"
                type="text"
                className={styles.input}
                placeholder="Escriba aqui"
              />
            </div>

            {/********************************  input para Teléfono "De Emergencia" *********************************/}

            <div className={styles.inputs_multi}>
              <Label for="de_emergencia" className={styles.label}>
                De emergencia
              </Label>

              <Input
                id="de_emergencia"
                name="de_emergencia"
                type="text"
                className={styles.input}
                placeholder="Escriba aqui"
              />
            </div>
          </FormGroup>

          {/********************************  input para la Dirección *********************************/}

          <FormGroup className={styles.container_input}>
            <Label for="direccion" className={styles.label}>
              Dirección
            </Label>

            <Input
              id="direccion"
              name="direccion"
              type="text"
              className={styles.input}
              placeholder="Escriba aqui"
            />
          </FormGroup>

          {/********************************  input para el usuario *********************************/}

          <FormGroup className={styles.container_input}>
            <Label for="usuario" className={styles.label}>
              Nombre de Usuario
            </Label>

            <Input
              id="usuario"
              name="usuario"
              type="text"
              className={styles.input}
              placeholder="Escriba aqui"
            />
          </FormGroup>

          {/********************************  input para el Corre Electrónico *********************************/}

          <FormGroup className={styles.container_input}>
            <Label for="correo" className={styles.label}>
              Correo Electrónico
            </Label>

            <Input
              id="correo"
              name="correo"
              type="text"
              className={styles.input}
              placeholder="Escriba aqui"
            />
          </FormGroup>

          {/********************************  input para el Turno *********************************/}

          <FormGroup className={styles.container_input}>
            <Label for="turno" className={styles.label}>
              Turno
            </Label>

            <Input
              id="turno"
              name="turno"
              type="text"
              placeholder="Seleccione Opción"
              className={`${styles.input} ${styles.cursor}`}
              readOnly
              value={turno}
              onClick={active_MoTurno}
            />

            {Mo_turno && <Modal_add active={active_MoTurno} setTurno={setTurno} state={true}/>}
          </FormGroup>

          {/********************************  input para el Autobús *********************************/}

          <FormGroup className={styles.container_input}>
            <Label for="autobus" className={styles.label}>
              Autobús
            </Label>

            <Input
              id="autobus"
              name="autobus"
              type="text"
              placeholder="Seleccione Opción"
              className={`${styles.input} ${styles.cursor}`}
              readOnly
              value={bus}
              onClick={active_MoBus}
            />

            {Mo_bus && <Modal_add active={active_MoBus} setBus={setBus} state={false}/>}
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
