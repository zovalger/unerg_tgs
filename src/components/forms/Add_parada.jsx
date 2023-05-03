import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";

import style from "../../styles/Routes/routes_view.module.css";
import styleForm from "../../styles/Edit/edit.module.css";

//Retocar
export default function Add_parada() {

	return (
		<>
			<div className={style.container_routes}>
				<h2>Nueva Parada</h2>

				<div className={styleForm.container__form}>
					<Form className="container-xl">
						<FormGroup>
							<Label className={styleForm.label} for="new_parada">
								Nombre de la parada
							</Label>
							<Input
								className={styleForm.input}
								id="new_parada"
								name="new_parada"
								placeholder="Nombre de la parada"
								type="text"
							/>
						</FormGroup>

						
<h4>Tipo</h4>
						<FormGroup check>
							<Input name="radio2" type="radio" defaultChecked />
							<Label check>Parada </Label>
						</FormGroup>

						<FormGroup check className="mb-3">
							<Input name="radio2" type="radio" id="control_point  " />
							<Label check for="control_point">
								Punto de Control
							</Label>
						</FormGroup>

						<Button className={styleForm.button}>Guardar</Button>
					</Form>
				</div>
			</div>
		</>
	);
}
