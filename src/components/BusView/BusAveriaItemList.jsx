import style from "./BusAveriaItemList.module.css";

export default function BusAveriaItemList({ data }) {
	const { content } = data;

	return (
		<div className={style.container}>
			<div>{content}</div>
		</div>
	);
}
