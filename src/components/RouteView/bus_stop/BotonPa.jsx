import style from "../../../styles/Routes/routes_view.module.css"

export default function BotonPa(props){
    
    return(
        <>
            <div className= {style.botonRuta}>
                <div className={style.textContainer__lu}>
                    <h2>{props.lugar}</h2>
                </div>
                 <div className={style.textContainer__km}>
                    <p>{props.km} KM</p>
                </div>
            </div>
        </>
        )
}