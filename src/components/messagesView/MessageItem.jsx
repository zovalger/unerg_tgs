import style from "./MessageItem.module.css";

const MessageItem = ({ data, user_id }) => {
	return <div className={style.container}>{data}</div>;
};

export default MessageItem;
