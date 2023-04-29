import style from "../../../styles/Routes/routes_view.module.css"
import {  BiPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";


export default function BotonPa_edit(props){
    
    return(
        <>
            <div className= {style.botonRuta}>

                <div className={style.delete}>
                    <BsFillTrashFill />
                </div>

                <div className={style.textContainer}>
                    <h2>{props.lugar}</h2>
                </div>

                <div className={style.edit}>
                    <BiPencil />
                </div>  

            </div>
        </>
        )
}