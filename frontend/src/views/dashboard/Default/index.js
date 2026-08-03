import React, { useState, useEffect } from 'react';

import "react-loading-skeleton/dist/skeleton.css";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import ApiService from "services/ApiService";
//------------------------------------------------------------------------------------

import Logo from "ui-component/Logo";
import NewChat from "ui-component/NewChat";
import Help from "ui-component/Help";
import Github from "ui-component/Github";
import Loading from "ui-component/Loading";
import Typing from "ui-component/Typing";

import ChatBot from "./ChatBot";
import Message from "./Message";
//------------------------------------------------------------------------------------

const Dashboard = () => {
  const [messages, set_messages] = useState([]);
  const [disabled_chatbot, set_disabled_chatbot] = useState(false);
  const [is_generating, set_is_generating] = useState(false);
  const [scroll_bar, set_scroll_bar] = useState(null);

  useEffect(() => {
    if (messages.length === 0) {
      document.getElementById('question').focus();
    }
  });

  const onRegisterMessage = (message) => {
    set_messages(messages => [...messages, message]);

    if (message.kind === 'question') {
      return genResponse(message);
    }

    setTimeout(function() {
      if (scroll_bar) scroll_bar.scrollTop = scroll_bar.scrollHeight;
      document.getElementById('question').focus();
    }, 250);
  }

  const genResponse = (message) => {
    set_disabled_chatbot(true);

    // Simulate register message on backend...
    message.read = true;
    set_is_generating(true);

    setTimeout(function() {
      if (scroll_bar) scroll_bar.scrollTop = scroll_bar.scrollHeight;

      // Generate message response...
      let params = {
        question: message.content,
        sandbox: 0
      };

      ApiService.postEndpoint(null, window.env.BACKEND_BASE_URL, 'chat', params,
        (response) => {
          set_is_generating(false);

          onRegisterMessage({
            id: 'demo-ai-rag-message-' + Date.now(),
            kind: 'response',
            content: response.response,
            context_sources: response.context_sources,
            question_rewritten: response.question_rewritten,
            new_question: response.new_question,
            read: true
          });

          set_disabled_chatbot(false);
        },
        (status, message) => {
          set_is_generating(false);

          onRegisterMessage({
            id: 'demo-ai-rag-message-' + Date.now(),
            kind: 'response',
            content: 'Our servers are busy right now. Try again in a few seconds.',
            context_sources: null,
            question_rewritten: false,
            new_question: null,
            read: true
          });

          set_disabled_chatbot(false);
        }
      );
    }, 250);
  }

  const quitMessage = (message) => {
    set_messages(
      messages.filter(x_message => x_message.id !== message.id)
    );
  }

  const sendQuery = (query, submit=true) => {
    const input = document.getElementById('question');
    if (!input || input.disabled) return;
    
    input.value = query;
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);

    if (!submit) return;

    setTimeout(() => {
      document.getElementById('send-button')?.click();
    }, 250);
  }

  return (
    <React.Fragment>
      <Logo />

      {
        messages && messages.length > 0 &&
        <NewChat onNewChat={() => set_messages([])} />
      }

      <Github />
      <Help sendQuery={sendQuery} />

      <PerfectScrollbar containerRef={ref => set_scroll_bar(ref)}>
        <div id="demo-ai-rag-container">
          {
            !messages &&
            <Loading />
          }

          {
            messages &&
            messages.length > 0 &&
            <h1 className="chat-title">RAG-powered AIS/AES analysis tool</h1>
          }
          
          {
            messages &&
            messages.length > 0 &&
            messages.map((x_message, index) => {
              return (
                <Message key={x_message.id} message={x_message} sendQuery={sendQuery} onQuit={() => quitMessage(x_message)} />
              )
            })
          }

          {
            messages &&
            messages.length > 0 &&
            is_generating &&
            <Typing />
          }

          {
            messages &&
            messages.length > 0 &&
            <div className="bottom-padding">&nbsp;</div>
          }
        </div>
      </PerfectScrollbar>

      {
        messages &&
        <ChatBot show_welcome={messages.length === 0} onRegisterMessage={onRegisterMessage} sendQuery={sendQuery} disabled={disabled_chatbot} />
      }
    </React.Fragment>
  );
};

export default Dashboard;
