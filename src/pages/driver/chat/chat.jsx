import React, { useState, useRef, useEffect } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { FaPaperPlane, FaCamera } from 'react-icons/fa';
import style from '@/styles/Chat/chat.module.css';

const Chat = () => {
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
      setMessages([...messages, <img src={URL.createObjectURL(file)} alt="Foto" className={style.image} />]);
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
    <div className={style.chatContainer}>
      <div className={style.messageContainer}>
        {messages.map((message, index) => (
          <div key={index} className={style.message}>
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={style.inputContainer}>
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
  );
};

export default Chat;