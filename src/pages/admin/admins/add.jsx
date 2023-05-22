//React/Next
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Componentes

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styles from "@/styles/Users/admin/Admins/add.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

//******************************* Codigo*****************************//
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
              <h2>Administradores</h2>
            </div>
          </>
        }
        right={<></>}
      />
      <div className={styles.container}>
        <Form>
          {/******************************** Input para Imagen de Perfil *********************************/}
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
          </FormGroup>

          {/******************************** Input para los nombres *********************************/}
          <FormGroup className={styles.container_input}>
            <Label for="nombres" className={styles.label}>
              Nombres
            </Label>

            <Input
              id="nombres"
              name="nombres"
              type="text"
              className={styles.input}
              placeholder="Escriba aqui"
            />
          </FormGroup>

          {/******************************** Input para los Apellidos *********************************/}
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

          {/********************************  Input para el Teléfono *********************************/}
          <FormGroup className={styles.container_input}>
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
          </FormGroup>

          {/********************************  Input para la Dirección *********************************/}
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

          {/********************************  Input para el usuario *********************************/}
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

          {/********************************  Input para el  Correo Electrónico *********************************/}
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

          {/********************************  Input para los permisos*********************************/}
          <FormGroup className={styles.container_input}>
          <Label className={styles.label}>Permisos</Label>
          <div className={styles.container__check}>
          <FormGroup check>
					
                    <Input
                        name="type"
                        type="switch"
                        id="Ver_usuarios"
                        defaultChecked
         
                    />
                    <Label check for="Ver_usuarios">
                        Ver usuarios
                    </Label>
                </FormGroup>
                <FormGroup check >
                    <Input
                        name="type"
                        type="switch"
                        id="Ver_usuariosAdmin"
                     
                    />
                    <Label check for="Ver_usuariosAdmin">
                        Ver usuarios administradores
                    </Label>
                </FormGroup>
                <FormGroup check >
                    <Input
                        name="type"
                        type="switch"
                        id="Editar_usuarios"
                     
                    />
                    <Label check for="Editar_usuarios">
                        Editar usuarios
                    </Label>

                </FormGroup>
                <FormGroup check >
                    <Input
                        name="type"
                        type="switch"
                        id="Editar_rutas"
                     
                    />
                    <Label check for="Editar_rutas">
                        Editar rutas
                    </Label>
                </FormGroup>
              
               
                </div>
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
