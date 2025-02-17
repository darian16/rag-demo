import React from 'react';
import help from "assets/images/help.svg";
import DemoTooltip from "ui-component/DemoTooltip";
//---------------------------------------------------------------

const Help = () => {
  return (
    <React.Fragment>
      <div id="help">
        <img src={help} alt="Help" width="100" data-tooltip-id="help-tooltip" data-tooltip-html="<b>This demonstration is limited to information from two source documents:</b><ul><li>2023 Analyst & Investor Meeting.</li><li>2024 Proxy Statement.</li></ul>Please note that responses are generated from these documents only and should be verified for accuracy.<br/><p style='margin: 0; margin-top: 7px;'>When referencing specific pages, the page numbers correspond to both the PDF viewer and the printed document numbers.</p>" />
      </div>

      <DemoTooltip id="help-tooltip" />
    </React.Fragment>
  );
};
//---------------------------------------------------------------

export default Help;
//---------------------------------------------------------------
