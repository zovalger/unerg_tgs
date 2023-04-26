import {Form, FormGroup, Input, Label, Button} from "reactstrap";
import style from "../styles/Login/login.module.css"

export function Login() { 
    return ( 
<>
<div className={style.bg}>
  <div className={style.container}>
    <div className={style.content}>
        <div className={style.title}>
            <p>
               <strong>
                UNERG TGS 
                </strong>
            </p>
            </div>
            <div className={style.text}>
            <p>
                <strong> 
                    Iniciar sesión
                </strong>
                </p>
            </div>
    </div>
  <Form>
    <FormGroup floating>
      <Input
      className={style.input}
        id="exampleUser"
        name="user"
        placeholder="user"
        type="user"
      />
      <Label className={style.label} for="exampleUser">
        Usuario
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
      className={style.input}
        id="password"
        name="password"
        placeholder="password"
        type="password"
      /> 
      <Label className={style.label} for="password">
        Contraseña
      </Label>
    </FormGroup>
    {' '}
    <Button className={style.button}>
      Iniciar sesión
    </Button>
  </Form>
  </div>
  </div>
</>
    );
  }
  export default Login;