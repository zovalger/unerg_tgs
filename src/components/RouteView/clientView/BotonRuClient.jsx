import style from "@/styles/Routes/routes_view.module.css";

export default function BotonRuClient({ datos}) {
	const { _id, name, description } = datos;
	return (
		<>
			<div
				className={style.botonRutaCliente} >
				<div className={style.textContainer__Ru}>
					<h2>{name}</h2>
					<p>{description}</p>
				</div>
				<div className={style.textContainer__Ho}>
					<p>hora inical - hora final</p>
				</div>
			</div>
		</>
	);
}
