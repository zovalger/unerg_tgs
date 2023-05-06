import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import style from "../../../styles/Bus/add.module.css"

const AddBuss = () => {
	
	return (
		<div className={style.form_container}> 
			<Form>
		  <FormGroup>
			<Label for="placa">
				Placa
			</Label>
			<Input
			className={style.input}
			  type="text"
			  name="placa"
			  id="placa"
			  placeholder="Escriba aquí"
			/>
		  </FormGroup>
		  <FormGroup>
			<Label for="numeroUnidad">
				Número de Unidad
			</Label>
			<Input
			className={style.input}
			  type="text"
			  name="numeroUnidad"
			  id="numeroUnidad"
			  placeholder="Escriba aquí"
			/>
		  </FormGroup>
		  <FormGroup>
			<Label for="ruta">Ruta</Label>
			<Input
			className={style.input}
			  type="select"
			  name="ruta"
			  id="ruta"
			/>
		  </FormGroup>
		  <Button className={style.button} type="submit" color="primary">
			Guardar
			</Button>
		</Form>
		</div>
	  );
	};
	
export default AddBuss