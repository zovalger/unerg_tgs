import React, { useContext } from "react";
import styles from "./MessageItem.module.css";
import UserContext from "@/contexts/User.context";
import ChatsContext from "@/contexts/Chats.context";
import moment from "moment";
import MessageResponseReference from "./MessageResponseReference";

const MessageItem = ({ data, setResponseMessage }) => {
	const { chatsObj, userNames, refreshNamesUsers } = useContext(ChatsContext);
	const { user } = useContext(UserContext);

	const {
		_id,
		text,
		driverId,
		adminId,
		_chatId,
		urlPhoto,
		createdAt,
		response,
	} = data;



	const userId = driverId ? driverId : adminId;
	const sendingClass = user._id == userId ? styles.sent : styles.received;

	return (
		<div
			className={`${styles.container} ${sendingClass}`}
			onDoubleClick={() => {
				setResponseMessage(_id);
			}}
		>
			{user._id != userId && (
				<div className={styles.people}>
					<strong> {userId === null ? "Root" : userNames[userId]}</strong>
				</div>
			)}

			{response && <MessageResponseReference responseId={response} _chatId={_chatId}/>}

			{urlPhoto && urlPhoto.url && (
				<div className={styles.image}>
					<img src={urlPhoto.url} />
				</div>
			)}
			{text && <div className={styles.text}>{text}</div>}
			<div className={styles.little}>{moment(createdAt).format("h:mm a")}</div>
		</div>
	);
};

export default MessageItem;
