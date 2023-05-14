
//Estilos 

import styles from "@/styles/Conductores/modal.module.css"

const Modal_add = ( {active, setTurno, setBus, state}) =>{

    return(
      <>

      {state ? (

        //************************ Modal para el input de turnos**********************

        <div className={styles.container} onClick={active}>
        <div className={styles.container__elements}>
            <h2>Horarios</h2>

            <div className={styles.container__btn}>
              
              <div className={styles.btn} onClick={() => setTurno("Mañana")}>
                  <p>Mañana</p>
              </div>
              <div className={styles.btn} onClick={() => setTurno("Tarde")}>
                  <p>Tarde</p>
              </div>
              <div className={styles.btn} onClick={() => setTurno("Noche")}>
                  <p>Noche</p>
              </div>
            
            </div>

        </div>
      </div>
      ) : (

        //************************ Modal para el input de autobuses**********************
        <div className={styles.container} onClick={active}>
        <div className={styles.container__elements}>
            <h2>Autobuses</h2>

            <div className={styles.container__btn}>

            {/****** Agg .map ******/}
            <div className={styles.btn} onClick={() => setBus("valor recibido de la base de datos")}>
                  <p>Heredar</p>
              </div>


            </div>

        </div>
      </div>
      )
      }

      </>
  
    )
  }

  export default Modal_add