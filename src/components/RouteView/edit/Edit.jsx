import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";

import style from "../../../styles/Routes/routes_view.module.css";
import styleForm from "../../../styles/Edit/edit.module.css";

//Retocar
export default function Edit() {
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

						{/* <FormGroup>
							<Input
								className={styleForm.input_check}
								id="parada"
								name="parada"
								type="checkbox"
							/>
							<Label className={styleForm.label} for="parada"></Label>
						</FormGroup>

						<FormGroup>
							<Input
								className={styleForm.input_check}
								id="control_point"
								name="control_point"
								type="checkbox"
							/>
							<Label className={styleForm.label} for="control_point"></Label>
						</FormGroup> */}
<h4>tipo</h4>
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
