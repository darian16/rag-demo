import React, { useState } from 'react';

import "react-loading-skeleton/dist/skeleton.css";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import ApiService from "services/ApiService";
//------------------------------------------------------------------------------------

import Help from "ui-component/Help";
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

  const onRegisterMessage = (message) => {
    set_messages(messages => [...messages, message]);
    if (message.kind === 'question') genResponse(message);

    setTimeout(function() {
      scroll_bar.scrollTop = scroll_bar.scrollHeight;
    }, 250);
  }

  const genResponse = (message) => {
    set_disabled_chatbot(true);

    // Simulate register message on backend...
    setTimeout(function() {
      message.read = true;
      set_is_generating(true);
      scroll_bar.scrollTop = scroll_bar.scrollHeight;

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
            read: true
          });

          set_disabled_chatbot(false);
        }
      );
    }, 500);
  }

  const quitMessage = (message) => {
    set_messages(
      messages.filter(x_message => x_message.id !== message.id)
    );
  }

  return (
    <React.Fragment>
      <Help />

      <PerfectScrollbar containerRef={ref => set_scroll_bar(ref)}>
        <div id="demo-ai-rag-container">
          {
            !messages &&
            <Loading />
          }

          {
            messages &&
            messages.length > 0 &&
            <h1 className="chat-title">RAG-powered survey analysis tool</h1>
          }
          
          {
            messages &&
            messages.length > 0 &&
            messages.map((x_message, index) => {
              return (
                <Message key={x_message.id} message={x_message} onQuit={() => quitMessage(x_message)} />
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
        <ChatBot show_welcome={messages.length === 0} onRegisterMessage={onRegisterMessage} disabled={disabled_chatbot} />
      }
    </React.Fragment>
  );
};

export default Dashboard;
