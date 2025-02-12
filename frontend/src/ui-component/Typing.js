import React from 'react'
import typing from 'assets/images/typing.svg';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
//---------------------------------------------------------------

const Typing = (props) => {
    const { className } = props;

    return (
    	<React.Fragment>
	    	<div className="clearfix"></div>
		    <div className={'typing ' + className}>
		    	<SupportAgentIcon />

		      {
		          <img src={typing} alt='...' />
		      }
		    </div>
	    </React.Fragment>
    )
};
//---------------------------------------------------------------

export default Typing;
//---------------------------------------------------------------
