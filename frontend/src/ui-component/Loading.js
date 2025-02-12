import React from 'react'
import loading from 'assets/images/loading_dark.svg';
//---------------------------------------------------------------

const Loading = (props) => {
    const { className } = props;

    return (
        <div className={'loading ' + className}>
            {
                <img className='loading' src={loading} alt='...' />
            }
        </div>
    )
};
//---------------------------------------------------------------

export default Loading;
//---------------------------------------------------------------
