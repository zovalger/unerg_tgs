import { Form, FormGroup, Input, Label, Button } from "reactstrap";

import style from "../../styles/Edit/edit.module.css";

//Retocar
export default function Add_ruta() {
  return (
    <>
      <div className={style.container_AddRuta}>
        <div className={style.container__form}>
          <Form className="container-xl">
            <FormGroup>
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
			        <Label className={style.label} for="new_bus">
                Autobuses asignados
              </Label>
              <Input
                className={style.input}
                id="new_bus"
                name="new_bus"
                type="select"
              />

              <h2>Horario</h2>

            </FormGroup>

            <Button className={style.button}>Guardar</Button>
          </Form>
        </div>
      </div>
    </>
  );
}
