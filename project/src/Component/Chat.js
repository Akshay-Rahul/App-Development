import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import vijayAvatar from './vijay.jpg';
import './Chatbot.css';

const Chatbot = () => {
  const [name, setName] = useState('');

  const steps = [
    {
      id: '0',
      message: 'Vanakam Nanba',
      trigger: '1',
    },
    {
      id: '1',
      message: 'What is your name?',
      trigger: 'get_name',
    },
    {
      id: 'get_name',
      user: true,
      validator: (value) => {
        if (!value || value.trim() === '') {
          return 'Please enter a valid name.';
        }
        return true;
      },
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, how can I help you?',
      trigger: 'end',
    },
    {
      id: 'end',
      message: 'Thank you!',
      end: true,
    },
  ];

  const config = {
    botAvatar: vijayAvatar,
    botAvatarStyle: {
      borderRadius: '50%',
      width: '60px',
      height: '60px',
    },
    floating: true,
  };

  return (
    <div className="App">
      <div className="chatbot-container">
        <div className="chatbot-header">Thalapathy Vijay</div>
        <ChatBot
          steps={steps}
          botBubbleColor="#grey"
          botFontColor="#white"
          userBubbleColor="#grey"
          userFontColor="#white"
          botAvatar={vijayAvatar}
          botAvatarStyle={config.botAvatarStyle}
          {...config}
        />
      </div>
    </div>
  );
};

export default Chatbot;
