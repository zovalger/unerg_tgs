//React-Next
import * as React from 'react';
import Link from "next/link";
import { useState } from "react";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";
import styles from "@/styles/Users/driver/capacidad.module.css"

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";


import { Range, Direction} from "react-range";
import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";

import { IoIosArrowBack } from "react-icons/io";

//Contextos


//****************************** Codigo *****************************//

const Capacidad = () => {

  const [value, setValue] = useState(0);

  const handleStateChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <NavBar
        title={"Capacidad del bus"}
        ViPrincipal={true}
        left={
          <div>
            <Link href={"./map"} className={styleN.btn_return}>
              <IoIosArrowBack />
            </Link>
          </div>
        }
        right={<></>}
      />

      <div className={styles.container}>
        <Form className={styles.form}>
          <p>{value}</p>
        <SuperSimple value={value} onStateChange={handleStateChange}>
        </SuperSimple>
        </Form>
      </div>
    </Layout>
  );
};

export default Capacidad;

class SuperSimple extends React.Component {
  state = { values: [this.props.value] };
  handleStateChange = (newValue) => {
    this.props.onStateChange(newValue);
  };
  render() {
    return (
      <Range
        step={1}
        min={0}
        max={100}
        values={this.state.values}
        direction={Direction.Up}
        onChange={(values) => {
          this.setState({ values });
          this.handleStateChange(values[0]);
        }}
        renderTrack={({ props, children }) => (
          <div

            {...props}
            style={{
              ...props.style,
              height: '100%',
              width: '100%',
              transition: 'height 0.1s ease-in-out',
            }}
            
          >
            {children}
            <h2 className={styles.porcentaje}>{this.state.values}%</h2>
          </div>
        )}
        renderThumb={({ props }) => (
          <div

            {...props}
            style={{
              ...props.style,
            }}
          />
        )}
      />
    );
  }
}