import React from 'react';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
//------------------------------------------------------------------------------------

const Message = ({message, onQuit}) => {
  return (
    <React.Fragment>
      <div className="clearfix"></div>

      <div id={message.id} className={"message " + message.kind}>
        <p className="content" dangerouslySetInnerHTML={{__html: message.content}}></p>

        {
          message.kind === 'question' &&
          <button title='Quit this message' className="close" onClick={() => onQuit()}>
            <ClearIcon />
          </button>
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
          <ContentCopyIcon title="Copy to clipboard" className='content-action content-copy' />
        }

        {
          message.kind === 'response' &&
          <ShareIcon title="Share" className='content-action content-share' />
        }

        {
          message.kind === 'response' &&
          <ContentPasteSearchIcon title="Source chunks" className='content-action content-trace' />
        }

        {
          message.kind === 'response' &&
          <ClearIcon title="Quit this message" className='content-action content-close' onClick={() => onQuit()} />
        }
      </div>
    </React.Fragment>
  );
};

export default Message;
