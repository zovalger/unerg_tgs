//React/Next
import Link from 'next/link';
//Componentes
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";

//Estilos
import style from "../../../styles/Bus/add.module.css"
import styleN from "../../../styles/Nav/NavStyle.module.css"


const AddBuss = () => {
	
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
								<h2>Autobuses</h2>
							</div>
						</>
					}
					right={<></>}
				/>
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
		</Layout>
	  );
	};
	
export default AddBuss