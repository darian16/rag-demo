import React, { useState } from 'react';

import "react-loading-skeleton/dist/skeleton.css";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
//------------------------------------------------------------------------------------

import Logo from "ui-component/Logo";
import Loading from "ui-component/Loading";
import Typing from "ui-component/Typing";

import ChatBot from "./ChatBot";
import Message from "./Message";
//------------------------------------------------------------------------------------

const Dashboard = () => {
  const [messages, set_messages] = useState([
    // {id: 'message-1', kind: 'question', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', read: true},
    // {id: 'message-2', kind: 'response', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.', read: true}
  ]);

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
    }, 1000);

    // Simulate generate message response...
    setTimeout(function() {
      set_is_generating(false);

      onRegisterMessage({
        id: 'demo-ai-rag-message-' + Date.now(),
        kind: 'response',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.'
      });

      set_disabled_chatbot(false);
    }, 3000);
  }

  const quitMessage = (message) => {
    set_messages(
      messages.filter(x_message => x_message.id !== message.id)
    );
  }

  return (
    <React.Fragment>
      <Logo />

      <PerfectScrollbar containerRef={ref => set_scroll_bar(ref)}>
        <div id="demo-ai-rag-container">
          {
            !messages &&
            <Loading />
          }

          {
            messages &&
            messages.length > 0 &&
            <h1 className="chat-title">ConocoPhillips Company Chat</h1>
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
