import React, { useContext } from "react";
import styles from "./MessageItem.module.css";
import UserContext from "@/contexts/User.context";
import ChatsContext from "@/contexts/Chats.context";
import moment from "moment";

const MessageItem = ({ data }) => {
	const { chatsObj, userNames, refreshNamesUsers } = useContext(ChatsContext);
	const { user } = useContext(UserContext);

	const { text, driverId, adminId, _chatId, urlPhoto, createdAt, response } =
		data;
	const smsRespondido =
		response && chatsObj[_chatId].find((sms) => sms._id === response);

	const idUserRespondido = smsRespondido
		? smsRespondido.driverId
			? smsRespondido.driverId
			: smsRespondido.adminId
		: null;
	const nameRespondido =
		idUserRespondido === null ? "Root" : userNames[idUserRespondido];

	const userId = driverId ? driverId : adminId;
	const sendingClass = user._id == userId ? styles.sent : styles.received;

	return (
		<div className={`${styles.container} ${sendingClass}`}>
			{user._id != userId && (
				<div className={styles.people}>
					<strong> {userId === null ? "Root" : userNames[userId]}</strong>
				</div>
			)}
			{smsRespondido && (
				<div className={styles.responseContainer}>
					{smsRespondido.urlPhoto && smsRespondido.urlPhoto.url && (
						<div className={styles.responseImage}>
							<img src={smsRespondido.urlPhoto.url} />
						</div>
					)}
					<div className={styles.responseNameAndText}>
						<div>
							<strong>{nameRespondido}</strong>
						</div>
						<div>{smsRespondido.text}</div>
					</div>
				</div>
			)}
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
