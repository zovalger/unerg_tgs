import styles from "./ButtonFloating_Container.module.scss";

const ButtonFloatingContainer = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

export default ButtonFloatingContainer;
