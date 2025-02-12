import React from 'react';

import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
//------------------------------------------------------------------------------------

const ChatBot = ({show_welcome, onRegisterMessage, disabled}) => {
  const onInputChange = () => {
    let value = document.getElementById('question').value;

    if (value === "") {
      document.getElementById('send-button').classList.add("disabled");
      document.getElementById('voice-button').classList.add("disabled");
    }
    else {
      document.getElementById('send-button').classList.remove("disabled");
      document.getElementById('voice-button').classList.remove("disabled");
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();

    onRegisterMessage({
      id: 'demo-ai-rag-message-' + Date.now(),
      kind: 'question',
      content: document.getElementById('question').value,
      read: false
    });

    document.getElementById('question').value = "";
  }

  return (
    <form id="chatbot-form" onSubmit={(event) => onSubmit(event)}>
      <div className={"chatbot " + (show_welcome ? '' : 'ancle_bottom') + " " + (disabled ? "disabled" : "")}>
        {
          show_welcome &&
          <div className="welcome">
            <SupportAgentIcon />
            <br/>
            <p>Hi! I am an AI ChatBot about<br/>ConocoPhillips Company</p>
          </div>
        }

        <div className="question-container">
          {
            disabled &&
            <input id="question" type="text" placeholder="How can I help you?" disabled="disabled" />
          }

          {
            !disabled &&
            <input id="question" type="text" placeholder="How can I help you?" onInput={() => onInputChange()} />
          }

          <div className="chatbot-options">
            <IconButton id="send-button" className="disabled" onClick={(event) => onSubmit(event)}>
              <SendIcon />
            </IconButton>

            <IconButton id="voice-button" className="disabled voice" onClick={(event) => onSubmit(event)}>
              <KeyboardVoiceIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </form>
  )
};

export default ChatBot;
