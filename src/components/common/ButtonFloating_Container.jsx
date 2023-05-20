import styles from "./ButtonFloating_Container.module.css";

const ButtonFloatingContainer = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

export default ButtonFloatingContainer;
