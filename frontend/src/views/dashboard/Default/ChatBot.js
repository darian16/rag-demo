import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import DemoTooltip from "ui-component/DemoTooltip";
//------------------------------------------------------------------------------------

const ChatBot = ({show_welcome, onRegisterMessage, disabled}) => {
  const [disabled_send, set_disabled_send] = useState(true);
  const [disabled_voice, set_disabled_voice] = useState(true);

  const onInputChange = () => {
    let value = document.getElementById('question').value;
    set_disabled_send(value.length <= 1);
    set_disabled_voice(value.length <= 1);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (disabled) return;
    if (disabled_send) return;
    if (disabled_voice) return;

    onRegisterMessage({
      id: 'demo-ai-rag-message-' + Date.now(),
      kind: 'question',
      content: document.getElementById('question').value,
      context_sources: null,
      read: false
    });

    document.getElementById('question').value = "";
    onInputChange();
  }

  return (
    <form id="chatbot-form" onSubmit={(event) => onSubmit(event)}>
      <div className={"chatbot " + (show_welcome ? '' : 'ancle_bottom') + " " + (disabled ? "disabled" : "")}>
        {
          show_welcome &&
          <div className="welcome">
            <SupportAgentIcon />
            <br/>
            <p>Hi! What can I help with?</p>
          </div>
        }

        <div className="question-container">
          {
            disabled &&
            <input id="question" type="text" placeholder="Type your question..." disabled="disabled" />
          }

          {
            !disabled &&
            <input id="question" type="text" placeholder="Type your question..." onInput={() => onInputChange()} />
          }

          <div className="chatbot-options">
            <IconButton id="send-button" onClick={disabled ? null : (event) => onSubmit(event)} data-tooltip-id="send-tooltip" data-tooltip-html="Send" disabled={disabled_send || disabled}>
              <SendIcon />
            </IconButton>

            <IconButton id="voice-button" className={"voice"} onClick={disabled ? null : (event) => onSubmit(event)} data-tooltip-id="voice-tooltip" data-tooltip-html="Record" disabled={disabled_voice || disabled}>
              <KeyboardVoiceIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <DemoTooltip id={"send-tooltip"} />
      <DemoTooltip id={"voice-tooltip"} />
    </form>
  )
};

export default ChatBot;
