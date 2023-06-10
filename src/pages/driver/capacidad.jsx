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
        <SuperSimple>
        </SuperSimple>
        </Form>
      </div>
    </Layout>
  );
};

export default Capacidad;

class SuperSimple extends React.Component {
  state = { values: [0] };
  render() {
    return (
      <Range
        step={1}
        min={0}
        max={100}
        values={this.state.values}
        direction={Direction.Up}
        onChange={(values) => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            className={styles.barra}
            {...props}
            style={{
              ...props.style,
              height: `${(this.state.values[0]/100)*100}%`,
              transition: 'height 0.1s ease-in-out',
            }}
            
          >
            {children}
            <h2 className={styles.porcentaje}>{this.state.values}%</h2>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            className={styles.boton}
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