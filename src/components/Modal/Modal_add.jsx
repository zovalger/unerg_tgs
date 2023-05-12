
//Estilos 

import styles from "../../styles/Conductores/modal.module.css"

const Modal_add = (props) =>{

    return(
      <>
      <div className={styles.container}>
        <div className={styles.container__elements}>
            <h2>Horarios</h2>

            <div className={styles.container__btn}>
              
              <div className={styles.btn}>
                  <p>Mañana</p>
              </div>
              <div className={styles.btn}>
                  <p>Tarde</p>
              </div>
              <div className={styles.btn}>
                  <p>Noche</p>
              </div>
            
            </div>

        </div>
      </div>
      </>
  
    )
  }

  export default Modal_add