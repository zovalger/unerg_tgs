import style from "../../styles/Routes/routes_view.module.css"

export default function BotonRu( {datos} ){
    const { name, description } = datos
    console.log(datos)
    return(
        <>
            <div className= {style.botonRuta}>
                <div className={style.textContainer__Ru}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                 <div className={style.textContainer__Ho}>
                    <p>hora inical - hora final</p>
                </div>
            </div>
        </>
        )
}