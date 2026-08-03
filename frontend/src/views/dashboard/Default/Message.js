import React, { useState } from 'react';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';

import DemoTooltip from "ui-component/DemoTooltip";
//------------------------------------------------------------------------------------

const Message = ({message, sendQuery, onQuit}) => {
  const [show_context_sources, set_show_context_sources] = useState(false);

  const get_context_types = () => {
    let has_import = false;
    let has_export = false;

    if (message.context_sources) {
      message.context_sources.forEach((x_source) => {
        has_import = has_import || x_source.metadata.document_name.indexOf("Import") >= 0
        has_export = has_export || x_source.metadata.document_name.indexOf("Export") >= 0
      });
    }

    return {
      'has_import': has_import,
      'has_export': has_export
    }
  }

  const [context_types] = useState(get_context_types());

  const ContextSource = ({source}) => {
    return (
      <li>
        <span style={{fontWeight: 'bold'}}>Document:

        {
          source.metadata.document_name.indexOf("Import") >= 0 &&
          <InputIcon className="content-action import" /> 
        }

        {
          source.metadata.document_name.indexOf("Export") >= 0 &&
          <OutputIcon className="content-action export" /> 
        }

        </span>

        { source.metadata.document_name },&nbsp;

        <b>Page:</b> { source.metadata.document_page },&nbsp;
        <b>Estimated section:</b> { source.metadata.page_section_percent }
        <br/>
        <p>
          { source.page_content }
        </p>
      </li>
    )
  }

  const editQuestion = (message) => {
    sendQuery(document.getElementById(message.id).innerText, false);
  }

  const retryQuestion = (message) => {
    sendQuery(document.getElementById(message.id).innerText);
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
          message.context_sources.length > 0 &&
          <p className="context-types-indicator">
            { 
              context_types['has_import'] && 
              context_types['has_export'] &&
              <span>Context found in both Customs Export and Import Procedures.</span>
            }

            { 
              context_types['has_import'] && 
              !context_types['has_export'] &&
              <span>Context found in Customs Import Procedures.</span>
            }

            { 
              !context_types['has_import'] && 
              context_types['has_export'] &&
              <span>Context found in Customs Export Procedures.</span>
            }

            {
              message.question_rewritten &&
              <span>&nbsp;Question rewritten to: {message.new_question}...</span>
            }
          </p>
        }

        {
          message.context_sources &&
          message.context_sources.length > 0 &&
          <p className="content" 
            data-tooltip-id={"context_sources-tooltip-" + message.id} 
            data-tooltip-html={show_context_sources ? "Click to Hide context sources" : "Click to Show context sources"}
            dangerouslySetInnerHTML={{__html: message.content }}
            onClick={() => set_show_context_sources(!show_context_sources)}>
          </p>
        }
        
        {
          !message.context_sources &&
          <p className="content fixed-content" 
            dangerouslySetInnerHTML={{__html: message.content }}>
          </p>
        }

        {
          message.context_sources &&
          message.context_sources.length === 0 &&
          <p className="content fixed-content" 
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
          <ContentCopyIcon 
            className='content-action content-copy' 
            data-tooltip-id={"message-copy-tooltip-" + message.id} 
            data-tooltip-html="Copy to clipboard." 
            onClick={() => copyToClipboard(message)}
          />
        }

        {
          message.kind === 'question' &&
          <EditIcon 
            className='content-action content-edit' 
            data-tooltip-id={"message-edit-tooltip-" + message.id} 
            data-tooltip-html="Edit this question."
            onClick={() => editQuestion(message) }
          />
        }

        {
          message.kind === 'question' &&
          <RefreshIcon 
            className='content-action content-retry' 
            data-tooltip-id={"message-retry-tooltip-" + message.id} 
            data-tooltip-html="Retry this question."
            onClick={() => retryQuestion(message) }
          />
        }
      </div>
      
      <DemoTooltip id={"context_sources-tooltip-" + message.id} />
      <DemoTooltip id={"message-copy-tooltip-" + message.id} />
      <DemoTooltip id={"message-edit-tooltip-" + message.id} />
      <DemoTooltip id={"message-retry-tooltip-" + message.id} />
    </React.Fragment>
  );
};

export default Message;
