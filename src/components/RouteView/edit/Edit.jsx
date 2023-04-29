import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";

import style from "../../../styles/Routes/routes_view.module.css";
import styleForm from "../../../styles/Edit/edit.module.css"

export default function Edit() {
  return (
    <>
      <div className={style.container_routes}>
        <h2>Nueva Parada</h2>

        <Form>
          <FormGroup floating>
            <Input
              className={styleForm.input}
              id="new_parada"
              name="new_parada"
              placeholder="New_parada"
              type="text"
            />

            <Label className={styleForm.label} for="new_parada">
              Nombre de la parada
            </Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              className={styleForm.input}
              id="parada"
              name="parada"
              placeholder="parada"
              type="checkbox"
            />

            <Label className={styleForm.label} for="parada">
              Parada
            </Label>
          </FormGroup>

          <Button className={styleForm.button}>Guardar</Button>
        </Form>
      </div>
    </>
  );
}
