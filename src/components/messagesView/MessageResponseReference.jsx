import { useContext } from "react";
import styles from "./MessageResponseReference.module.css";
import ChatsContext from "@/contexts/Chats.context";
import UserContext from "@/contexts/User.context";

const MessageResponseReference = ({ responseId, _chatId, onClick }) => {
	const { chatsObj, userNames, refreshNamesUsers } = useContext(ChatsContext);

	const smsRespondido = chatsObj[_chatId].find((sms) => sms._id === responseId);

	const idUserRespondido = smsRespondido
		? smsRespondido.driverId
			? smsRespondido.driverId
			: smsRespondido.adminId
		: null;

	const nameRespondido =
		idUserRespondido === null ? "Root" : userNames[idUserRespondido];

	return (
		<div className={styles.container} onClick={onClick}>
			{smsRespondido.urlPhoto && smsRespondido.urlPhoto.url && (
				<div className={styles.image}>
					<img src={smsRespondido.urlPhoto.url} />
				</div>
			)}
			<div className={styles.nameAndText}>
				<div>
					<strong>{nameRespondido}</strong>
				</div>
				<div>{smsRespondido.text}</div>
			</div>
		</div>
	);
};

export default MessageResponseReference;
