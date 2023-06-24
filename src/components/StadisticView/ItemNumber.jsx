import styles from "./ItemNumber.module.css";

const ItemNumber = ({ title, num }) => {
	return (
		<div className={styles.container}>
			<div className={styles.num}>{num}</div>
			<div className={styles.title}>{title}</div>
		</div>
	);
};
export default ItemNumber;
