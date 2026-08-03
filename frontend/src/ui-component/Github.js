import React from 'react';
import github from "assets/images/github.svg";
import DemoTooltip from "ui-component/DemoTooltip";
//---------------------------------------------------------------

const Github = () => {
  return (
    <React.Fragment>
      <div id="github">
        <a href="https://github.com/nivalcode/demo2" target="_blank" rel="noreferrer">
          <img src={github} alt="Github" width="100" data-tooltip-id="github-tooltip" data-tooltip-html="Github repository" />
        </a>
      </div>

      <DemoTooltip id="github-tooltip" />
    </React.Fragment>
  );
};
//---------------------------------------------------------------

export default Github;
//---------------------------------------------------------------
