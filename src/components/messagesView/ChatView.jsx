import { useState, useRef, useEffect, useContext } from "react";

import { InputGroup, Input, Button } from "reactstrap";
import { FaPaperPlane, FaCamera } from "react-icons/fa";
import ChatsContext from "@/contexts/Chats.context";

import styleC from "@/styles/Chat/chat.module.css";
import MessageItem from "./MessageItem";

import { v4 as uuid } from "uuid";
import imageAllowedTypes from "@/config/imageAllowedTypes";

const ChatView = ({ chat, messages, sendMessage }) => {
	const [textMessage, setTextMessage] = useState("");
	const [imageFile, setImageFile] = useState(null);

	const inputFileRef = useRef(null);
	const messagesEndRef = useRef(null);

	const handleInputChange = (event) => {
		setTextMessage(event.target.value);
	};

	const handleSendMessage = () => {
		const text = textMessage.trim();

		if (!text && !imageFile) return;

		sendMessage(textMessage, imageFile);

		setTextMessage("");
		setImageFile(null);
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
			const dataBase64 = event.target.result;
			setImageFile(dataBase64);
		};

		reader.readAsDataURL(file);
	};

	const handleCameraButtonClick = () => {
		inputFileRef.current.click();
	};

	// const sendImage = (file) => {
	// 	if (file) {
	// 		// eslint-disable-next-line react/jsx-key, @next/next/no-img-element
	// 		setMessages([
	// 			...messages,
	// 			<img
	// 				src={URL.createObjectURL(file)}
	// 				alt="Foto"
	// 				className={styleC.image}
	// 			/>,
	// 		]);
	// 		setImageFile(null);
	// 	}
	// };

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
		<div className={styleC.chatContainer}>
      <div className={styleC.messageContainer}>
        {messages.map((message, index) => (
          <MessageItem
            key={message?.id || uuid()}
            data={message.text}
            isSent={message.isSent}
          />
        ))}
				<div ref={messagesEndRef} />
			</div>
			<div className={styleC.inputContainer}>
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
		</div>
	);
};

export default ChatView;
