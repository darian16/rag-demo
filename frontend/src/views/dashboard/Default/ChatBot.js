import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import StopIcon from '@mui/icons-material/Stop';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useVoice } from 'react-use-voice';

import DemoTooltip from "ui-component/DemoTooltip";
//------------------------------------------------------------------------------------

const ChatBot = ({show_welcome, onRegisterMessage, sendQuery, disabled}) => {
  const [disabled_send, set_disabled_send] = useState(true);

  const { 
    interimTranscript,
    listening, 
    start, 
    stop, 
    supported,
    error
  } = useVoice({
    lang: 'en-US',
    onResult: (result) => {
      console.log('Interim result:', result);
    },
    onEnd: () => {
      console.log('Voice recognition ended');
    }
  });

  useEffect(() => {
    if (!listening) return;
    if (!interimTranscript) return;

    let input = document.getElementById('question');
    input.value = interimTranscript;
    input.focus();
    input.setSelectionRange(interimTranscript.length, interimTranscript.length);
  }, [interimTranscript, listening]);

  const onStartListening = () => {
    document.getElementById('question').value = "";
    onInputChange();
    start();
  };

  const onStopListening = () => {
    stop();
    onInputChange();
  };

  const onInputChange = () => {
    let value = document.getElementById('question').value;
    set_disabled_send(value.length <= 3);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (disabled) return;
    if (disabled_send) return;

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

  const sampleQueries = [
    "What are the differences between declarations for UK and EU trades?",
    "Is it possible to declare empty containers?",
    "What are the time limits for lodging export declaration?",
    "What is the Windsor Framework?",
    "Give me the differences between manifests for ships departing to any country and to another EU country.",
    "What is the time limit for rail traffic?"
  ];

  const handleSampleQueryClick = (query) => {
    sendQuery(query);
  };

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
            <IconButton type="submit" id="send-button" onClick={disabled ? null : (event) => onSubmit(event)} data-tooltip-id="send-tooltip" data-tooltip-html="Send" disabled={disabled || disabled_send}>
              <SendIcon />
            </IconButton>

            {
              supported &&
              !listening &&
              <IconButton className={"voice"} onClick={disabled ? null : () => onStartListening()} data-tooltip-id="voice-tooltip" data-tooltip-html="Record" disabled={disabled}>
                <KeyboardVoiceIcon />
              </IconButton>
            }

            {
              supported &&
              listening &&
              <IconButton className={"voice"} onClick={() => onStopListening()} data-tooltip-id="recording-tooltip" data-tooltip-html="Stop" disabled={disabled}>
                <StopIcon />
              </IconButton>
            }
          </div>
        </div>

        {
          !supported &&
          <p id="ai_tip" style={{opacity: '1', color: 'var(--warning_color)'}}>
            Your web browser do not support speech recognition.
          </p>
        }

        {
          supported &&
          error &&
          <p id="ai_tip" style={{opacity: '1', color: 'var(--warning_color)'}}>
            { error }
          </p>
        }

        <p id="ai_tip" style={{marginTop: '5px', marginBottom: '10px'}}>
          Earground is AI and can make mistakes. Please. double-check responses.
        </p>

        {
          show_welcome &&
          <div className="sample-queries-container">
            <div className="sample-queries-wrapper">
              <div className="sample-queries-header">
                <span className="sample-queries-icon"><TipsAndUpdatesIcon style={{opacity: '0.85', color: 'var(--secondary_color)'}} /></span>
                <h3 className="sample-queries-title">Sample of queries:</h3>
              </div>
              <div className="sample-queries-grid">
                {sampleQueries.map((query, index) => (
                  <button
                    type="button"
                    key={index}
                    className="sample-query-button"
                    onClick={() => handleSampleQueryClick(query)}
                  >
                    <span className="query-arrow">→</span>
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
      </div>

      <DemoTooltip id={"send-tooltip"} />
      <DemoTooltip id={"voice-tooltip"} />
      <DemoTooltip id={"recording-tooltip"} />
    </form>
  )
};

export default ChatBot;
