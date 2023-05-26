import {Form, FormGroup, Input, Label, Button} from "reactstrap";
import style from "../styles/Login/login.module.css"
import Layout from "@/layouts/Layout";

const Recover_password = ( ) => { 
    return ( 
          <Layout>
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
                            Cambiar mi contraseña
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
                    type="text"
                  />
                  <Label className={style.label} for="exampleUser">
                    Usuario
                  </Label>
                </FormGroup>

                <FormGroup floating>
                  <Input
                  className={style.input}
                    id="NewPassword"
                    name="NewPassword"
                    placeholder="*"
                    type="password"
                  />
                  <Label className={style.label} for="NewPassword">
                    Nueva contraseña
                  </Label>
                </FormGroup>


                <FormGroup floating>
                  <Input
                  className={style.input}
                    id="RepeatPassword"
                    name="RepeatPassword"
                    placeholder="*"
                    type="password"
                  />
                  <Label className={style.label} for="RepeatPassword">
                    Repita la contraseña
                  </Label>
                </FormGroup>
    
    
                <Button className={style.button}>
                  Cambiar Contraseña
                </Button>
              </Form>
              </div>
              </div>
            </Layout>
    );
  }

  export default Recover_password