import {Form, FormGroup, Input, Label, Button} from "reactstrap";
import style from "../styles/Login/login.module.css"
import Layout from "@/layouts/Layout";

export function forgot_password() { 
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
                                Olvide mi contraseña
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
                <Button className={style.button}>
                  Cambiar Contraseña
                </Button>
              </Form>
              </div>
              </div>
            </Layout>
    );
  }
  export default forgot_password;