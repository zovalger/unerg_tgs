import { InputGroup, Input, Button } from "reactstrap";
import { useState, useRef, useEffect, useContext } from "react";
import { FaPaperPlane, FaCamera } from "react-icons/fa";
import { v4 as uuid } from "uuid";

import styles from "./ChatView.module.css";
import MessageItem from "./MessageItem";

import imageAllowedTypes from "@/config/imageAllowedTypes";
import MessageResponseReference from "./MessageResponseReference";
import scaleImage from "@/utils/scaleImage";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

const ChatView = ({
	chat,
	messages,
	sendMessage,
	chatsObj,
	chat_Id: _chatId,
}) => {
	const [textMessage, setTextMessage] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [responseMessage, setResponseMessage] = useState(null);

	const inputFileRef = useRef(null);
	const messagesEndRef = useRef(null);

	const handleInputChange = (event) => {
		setTextMessage(event.target.value);
	};

	const handleSendMessage = () => {
		const text = textMessage.trim();

		if (!text && !imageFile) return;

		sendMessage(textMessage, imageFile, responseMessage);

		setTextMessage("");
		setImageFile(null);
		setResponseMessage(null);
		inputFileRef.current.value = "";
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		if (!file || !imageAllowedTypes.includes(file?.type)) {
			inputFileRef.current.value = "";
			return;
		}

		const reader = new FileReader();

		reader.onload = async (event) => {
			const dataBase64 = await scaleImage(event.target.result);

			setImageFile(dataBase64);
		};

		reader.readAsDataURL(file);
	};

	const handleCameraButtonClick = () => {
		inputFileRef.current.click();
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSendMessage();
		}
	};

	useEffect(() => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className={styles.chatContainer}>
			<div className={styles.messageContainer}>
				{chatsObj[_chatId]?.map((message, index) => (
					<MessageItem
						key={message?.id || uuid()}
						data={message}
						setResponseMessage={(d) => {
							// messagesEndRef.current.focus();
							setResponseMessage(d);
						}}
					/>
				))}
				<div ref={messagesEndRef} />
			</div>
			{responseMessage && (
				<MessageResponseReference
					responseId={responseMessage}
					_chatId={_chatId}
					onClick={() => {
						setResponseMessage(null);
					}}
				/>
			)}
			<div className={styles.inputContainer}>
				<InputGroup>
					<Input
						type="text"
						value={textMessage}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
						placeholder="Escribe un mensaje"
					/>
					<Button color="secondary" onClick={handleCameraButtonClick}>
						<FaCamera />
					</Button>
					<Button color="primary" onClick={handleSendMessage}>
						<FaPaperPlane />
					</Button>
					<input
						type="file"
						accept="image/*"
						// style={{ display: "none" }}
						hidden
						ref={inputFileRef}
						onChange={handleImageChange}
					/>
				</InputGroup>
			</div>

			{imageFile && (
				<div className={styles.imageSenderPreview}>
					<div className={styles.imagePreviewPanel}>
						<div
							className={styles.closeButton}
							onClick={() => {
								setImageFile(null);
								inputFileRef.current.value = "";
							}}
						>
							<AiOutlineClose />
						</div>
						<div
							className={styles.imagePreview}
							onClick={handleCameraButtonClick}
						>
							<img src={imageFile} alt="sendingImage" />
						</div>

						<InputGroup>
							<Input
								type="text"
								value={textMessage}
								onChange={handleInputChange}
								onKeyPress={handleKeyPress}
								placeholder="Escribe un mensaje"
							/>

							<Button color="primary" onClick={handleSendMessage}>
								<FaPaperPlane />
							</Button>
						</InputGroup>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatView;
