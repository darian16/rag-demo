import React, { useState } from 'react';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DemoTooltip from "ui-component/DemoTooltip";
//------------------------------------------------------------------------------------

const Message = ({message, onQuit}) => {
  const [show_context_sources, set_show_context_sources] = useState(false);

  const ContextSource = ({source}) => {
    let docs = {
      '2023-conocophillips-aim-presentation.pdf': '2023 AIM Presentation',
      '2024-conocophillips-proxy-statement.pdf': '2024 Proxy Statement',
    }
    
    return (
      <li>
        <b>Document:</b> { docs[source.metadata.document_name] },&nbsp;
        <b>Page:</b> { source.metadata.document_page },&nbsp;
        <b>Estimated section:</b> { source.metadata.page_section_percent }
        <br/>
        <p>
          { source.page_content }
        </p>
      </li>
    )
  }
  
  const copyToClipboard = (message) => {
    navigator.clipboard.writeText(document.getElementById(message.id).innerText);
    document.getElementById(message.id).style.opacity = 0.5;

    setTimeout(function() {
      document.getElementById(message.id).style.opacity = 1;
    }, 250);
  }

  return (
    <React.Fragment>
      <div className="clearfix"></div>

      <div id={message.id} className={"message " + message.kind}>
        {
          message.context_sources &&
          <p className="content" 
            data-tooltip-id={"context_sources-tooltip-" + message.id} 
            data-tooltip-html={show_context_sources ? "Double clic to Hide context sources" : "Double clic to Show context sources"}
            dangerouslySetInnerHTML={{__html: message.content }}
            onDoubleClick={() => set_show_context_sources(!show_context_sources)}>
          </p>
        }
        
        {
          !message.context_sources &&
          <p className="content" 
            dangerouslySetInnerHTML={{__html: message.content }}>
          </p>
        }
        
        {
          show_context_sources &&
          <ul className="context_sources">
            {
              message.context_sources.map((x_source) => {
                return <ContextSource source={x_source} />
              })
            }
          </ul>
        }

        {
          message.kind === 'question' &&
          <CheckIcon className={"read-status-icon read-status-icon-1 " + (message.id ? "text-info" : "text-neutral" )} />
        }

        {
          message.kind === 'question' &&
          message.read &&
          <CheckIcon className="read-status-icon read-status-icon-2 text-info" />
        }

        {
          message.kind === 'response' &&
          <SupportAgentIcon />
        }
        
        {
          message.kind === 'response' &&
          <ContentCopyIcon 
            className='content-action content-copy' 
            data-tooltip-id={"message-copy-tooltip-" + message.id} 
            data-tooltip-html="Copy to clipboard." 
            onClick={() => copyToClipboard(message)}
          />
        }
      </div>
      
      <DemoTooltip id={"context_sources-tooltip-" + message.id} />
      <DemoTooltip id={"message-copy-tooltip-" + message.id} />
    </React.Fragment>
  );
};

export default Message;
