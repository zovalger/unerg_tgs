import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from "next/link";

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { InputGroup, Input, Button } from 'reactstrap';
import { FaPaperPlane, FaCamera } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import DriverContext from "@/contexts/Driver.context";

import styleC from '@/styles/Chat/chat.module.css';
import styleN from "@/styles/Nav/NavStyle.module.css";

const Chat = () => {

  const { sendMessage } = useContext(DriverContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const inputFileRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
      sendMessage(newMessage);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    sendImage(file);
  };

  const handleCameraButtonClick = () => {
    inputFileRef.current.click();
  };

  const sendImage = (file) => {
    if (file) {
      // eslint-disable-next-line react/jsx-key, @next/next/no-img-element
      setMessages([...messages, <img src={URL.createObjectURL(file)} alt="Foto" className={styleC.image} />]);
      setImageFile(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
<Layout>

<NavBar
					title={"Chat"}
					ViPrincipal={true}
					left={
						<div>
							<Link href={"../map"} className={styleN.btn_return}>
								<IoIosArrowBack />
							</Link>
						</div>
					}
					right={
						<>
							<Link href={"./add"}>		
							</Link>
						</>
					}
				/>

    <div className={styleC.chatContainer}>
      <div className={styleC.messageContainer}>
        {messages.map((message, index) => (
          <div key={index} className={styleC.message}>
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styleC.inputContainer}>
        <InputGroup>
          <Input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje"
          />
          <Button color="primary" onClick={handleSendMessage}>
            <FaPaperPlane />
          </Button>
          <Button color="secondary" onClick={handleCameraButtonClick}>
            <FaCamera />
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={inputFileRef}
            onChange={handleImageUpload}
          />
        </InputGroup>
      </div>
    </div>
   </Layout> 
  );
};

export default Chat;