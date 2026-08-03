import React from 'react';
import { Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DemoTooltip from "ui-component/DemoTooltip";
//---------------------------------------------------------------

const NewChat = ({onNewChat}) => {
  return (
    <React.Fragment>
      <div id="newchat">
        <Button
          id="new-chat"
          variant="contained"
          color="primary"
          startIcon={<EditNoteIcon />}
          onClick={() => onNewChat()}
          data-tooltip-id="newchat-tooltip"
          data-tooltip-html="Clear all messages and begin a new chat"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            background: 'white',
            fontWeight: 500,
            fontSize: '14px',
            padding: '8px 20px',
            boxShadow: '0 2px 8px rgba(24, 90, 188, 0.25)',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(24, 90, 188, 0.35)',
              transform: 'translateY(-1px)',
            },
            marginTop: '9px'
          }}
        >
          New Chat
        </Button>
      </div>

      <DemoTooltip id="newchat-tooltip" />
    </React.Fragment>
  );
};
//---------------------------------------------------------------

export default NewChat;
//---------------------------------------------------------------
