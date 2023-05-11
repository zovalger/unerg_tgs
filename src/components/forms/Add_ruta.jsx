// React/Next
import { useContext,  useState, useEffect } from "react";
import Link from "next/link";


//Componentes
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { BiPencil  } from "react-icons/bi";


//Estilos
import style from "../../styles/Edit/edit.module.css";


//Retocar
export default function Add_ruta() {


  //useState
  const [state, setState] = useState(true);


  return (
    <>
      <div className={style.container_AddRuta}>
        <div className={style.container__form}>
          <Form className="container-xl">
            <FormGroup 
            >
              <Label className={style.label} for="new_ruta">
                Nombre de la Ruta
              </Label>
              <Input
                className={style.input}
                id="new_ruta"
                name="new_ruta"
                placeholder="Nombre de la Ruta"
                type="text"
              />

              <Label className={style.label} for="description">
                Descripción
              </Label>
              <Input
                className={style.input}
                id="description"
                name="description"
                placeholder="Descripción"
                type="text"
              />

              {/*Modificar*/}
              <Label className={style.label} for="bus">
                Autobuses asignados
              </Label>
              <Input
                className={style.input}
                id="bus"
                name="bus"
                type="select"
              />

              <Label className={style.label} for="active_hours">
                Horario
              </Label>
              <div className={style.container_hours}>
                <div className={style.hours}>
                  <p>Hora de inicio</p>
                  <Input
                    className={style.input}
                    id="start_hours"
                    name="start_hours"
                    type="time"
                  />
                </div>

                <div className={style.hours}>
                  <p>Hora de Fin</p>
                  <Input
                    className={style.input}
                    id="end_hours"
                    name="end_hours"
                    type="time"
                  />
                </div>
              </div>

                {/*Modificar*/}
                {/* <Label className={style.label} for="parada">
                  Paradas
                </Label>
                <Input
                  className={style.input}
                  id="parada"
                  name="parada"
                  type="select"
                  >

                  <option>1</option>
                  <option>1</option>
                  <option>1</option>

                  </Input> */}
              
                </FormGroup>

                <div className={style.Rutas__addParada}>
                  <p>Editar Paradas</p>
                  <Link href={"./parada/menu_add"} className={`${style.add} ${style.add__rutas}`}>
                             <BiPencil />
                  </Link>
                </div>

                <FormGroup switch style={{padding:0}}>
                <Label className={style.label} for="state">
                  Estado de la Ruta
                </Label>
                <div className={style.container_check}>

                  <div className={style.text}>
                  {state ? <p>Activado</p> : <p>Desactivado</p> }  

                  </div>

                <Input
                  className={style.input}
                  id="state"
                  name="state"
                  type="switch"
                  checked={state}
                  onClick={() => {
                    setState(!state);
                  }}
                />
                </div>
                </FormGroup>
         

            <Button className={style.button}>Guardar</Button>
          </Form>
        </div>
      </div>
    </>
  );
}
